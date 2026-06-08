import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, Heart, Sparkles, BookOpen, AlertCircle
} from 'lucide-react';
import { Song, RepeatMode } from '../types';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFavorite: boolean;
  onToggleFavorite: (songId: string) => void;
  shuffle: boolean;
  setShuffle: (shuf: boolean) => void;
  repeatMode: RepeatMode;
  onCycleRepeat: () => void;
  showLyrics: boolean;
  setShowLyrics: (show: boolean) => void;
}

const formatTime = (secs: number) => {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const total = Math.floor(secs);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function PlayerBar({
  currentSong,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious,
  isFavorite,
  onToggleFavorite,
  shuffle,
  setShuffle,
  repeatMode,
  onCycleRepeat,
  showLyrics,
  setShowLyrics
}: PlayerBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onNextRef = useRef(onNext);
  const repeatModeRef = useRef(repeatMode);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    repeatModeRef.current = repeatMode;
  }, [repeatMode]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const syncDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleLoadedMetadata = () => {
      syncDuration();
      setIsLoading(false);
      setHasError(false);
    };

    const handleDurationChange = () => {
      syncDuration();
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleCanPlay = () => {
      syncDuration();
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleEnded = () => {
      if (repeatModeRef.current === 'one') {
        audio.currentTime = 0;
        setCurrentTime(0);
        audio.play().catch((err) => console.warn('Repeat one error:', err));
      } else {
        onNextRef.current();
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      console.error('HTML5 Audio playback encountered an error.');
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      setIsLoading(true);
      setHasError(false);
      setCurrentTime(0);
      setDuration(currentSong.durationInSeconds);

      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();

      if (isPlayingRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn('Autoplay was blocked or failed:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSong, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Manual audio play failed:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Smooth timeline updates while playing
  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime);
        if (audio.duration && isFinite(audio.duration)) {
          setDuration(audio.duration);
        }
        rafId = requestAnimationFrame(tick);
      }
    };

    if (isPlaying) {
      rafId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, currentSong?.id]);

  if (!currentSong) return null;

  const totalDuration = duration > 0 ? duration : currentSong.durationInSeconds;
  const progressPercentage = totalDuration > 0
    ? Math.min(100, (currentTime / totalDuration) * 100)
    : 0;

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handlePlayPause = () => {
    if (hasError) {
      if (audioRef.current && currentSong) {
        audioRef.current.load();
        setHasError(false);
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const repeatActive = repeatMode !== 'off';
  const repeatTitle =
    repeatMode === 'one' ? 'Repeat One' : repeatMode === 'all' ? 'Repeat All' : 'Repeat Off';

  const repeatButton = (id: string, mobile = false) => (
    <button
      id={id}
      onClick={onCycleRepeat}
      className={`relative p-1.5 rounded-lg transition-colors cursor-pointer ${
        repeatActive ? 'text-violet-400 hover:text-violet-300' : 'text-neutral-500 hover:text-white'
      }`}
      title={repeatTitle}
    >
      {repeatMode === 'one' ? (
        <Repeat1 className={mobile ? 'w-4 h-4' : 'w-4 h-4'} />
      ) : (
        <Repeat className={mobile ? 'w-4 h-4' : 'w-4 h-4'} />
      )}
      {repeatMode === 'one' && (
        <span className="absolute -top-0.5 -right-0.5 text-[8px] font-extrabold text-violet-400 leading-none">
          1
        </span>
      )}
    </button>
  );

  const playPauseButton = (
    <button
      id="btn-play-pause"
      onClick={handlePlayPause}
      className={`p-2.5 sm:p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ${
        hasError
          ? 'bg-rose-600 hover:bg-rose-500 text-white'
          : 'bg-white hover:bg-neutral-100 text-black'
      }`}
      title={hasError ? 'Load Error! Click to Retry.' : (isPlaying ? 'Pause' : 'Play')}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      ) : hasError ? (
        <AlertCircle className="w-5 h-5 text-white stroke-[2.5px]" />
      ) : isPlaying ? (
        <Pause className="w-5 h-5 fill-current text-black" />
      ) : (
        <Play className="w-5 h-5 fill-current text-black ml-0.5" />
      )}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#070b14]/95 border-t border-white/[0.08] shadow-2xl backdrop-blur-2xl pb-[env(safe-area-inset-bottom)]">
      {/* Progress bar */}
      <div className="w-full px-3 sm:px-4 md:px-8 pt-2.5 sm:pt-3">
        <input
          type="range"
          min={0}
          max={totalDuration}
          step={0.1}
          value={Math.min(currentTime, totalDuration)}
          onChange={handleSeek}
          className="player-range w-full h-2 sm:h-1.5 md:h-1 focus:outline-none rounded-lg appearance-none cursor-pointer accent-violet-500 transition-all"
          style={{
            background: `linear-gradient(to right, rgb(139, 92, 246) ${progressPercentage}%, rgba(255, 255, 255, 0.1) ${progressPercentage}%)`
          }}
        />
        <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden px-3 pb-2.5 pt-1 space-y-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-neutral-900">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-neutral-100 text-xs truncate">{currentSong.title}</h4>
            <p className="text-[10px] text-neutral-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => onToggleFavorite(currentSong.id)}
            className="flex-shrink-0 text-neutral-400 hover:text-fuchsia-400 p-1.5 rounded-full"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-fuchsia-500 stroke-fuchsia-500 text-fuchsia-400' : ''}`} />
          </button>
          <button
            id="btn-lyrics-toggle-mobile"
            onClick={() => setShowLyrics(!showLyrics)}
            className={`flex-shrink-0 p-1.5 rounded-lg border transition-all ${
              showLyrics
                ? 'bg-violet-500/10 border-violet-500/40 text-violet-300'
                : 'border-white/[0.06] text-neutral-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
          </button>
          <button
            id="btn-mute-mobile"
            onClick={() => setIsMuted(!isMuted)}
            className="flex-shrink-0 p-1.5 text-neutral-400"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-violet-400" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <button
            id="btn-shuffle-mobile"
            onClick={() => setShuffle(!shuffle)}
            className={`p-1.5 rounded-lg ${shuffle ? 'text-violet-400' : 'text-neutral-500'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-5">
            <button id="btn-prev-mobile" onClick={onPrevious} className="p-1.5 text-neutral-300">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            {playPauseButton}
            <button id="btn-next-mobile" onClick={onNext} className="p-1.5 text-neutral-300">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>

          {repeatButton('btn-loop-mobile', true)}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 md:px-8 py-3 items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0 w-1/4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow bg-neutral-900 group">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:rotate-6 transition-transform"
            />
            <div className="absolute inset-0 bg-violet-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <h4 className="font-bold text-neutral-100 text-sm truncate">{currentSong.title}</h4>
              {isLoading && (
                <span className="flex-shrink-0 text-[8px] font-mono font-extrabold bg-violet-500/20 text-violet-400 border border-violet-500/20 px-1 py-[2px] rounded animate-pulse">
                  LOAD
                </span>
              )}
              {hasError && (
                <span className="flex-shrink-0 text-[8px] font-mono font-extrabold bg-rose-500/20 text-rose-400 px-1 py-[2px] rounded border border-rose-500/20">
                  ERR
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-400 truncate mt-0.5">{currentSong.artist}</p>
          </div>

          <button
            onClick={() => onToggleFavorite(currentSong.id)}
            className="flex-shrink-0 text-neutral-400 hover:text-fuchsia-400 p-1.5 rounded-full hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-fuchsia-500 stroke-fuchsia-500 text-fuchsia-400 scale-110' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <button
            id="btn-shuffle"
            onClick={() => setShuffle(!shuffle)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              shuffle ? 'text-violet-400 hover:text-violet-300' : 'text-neutral-500 hover:text-white'
            }`}
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            id="btn-prev"
            onClick={onPrevious}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Previous song"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {playPauseButton}

          <button
            id="btn-next"
            onClick={onNext}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Next song"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {repeatButton('btn-loop')}
        </div>

        <div className="flex items-center justify-end gap-4 w-1/4">
          <button
            id="btn-lyrics-toggle"
            onClick={() => setShowLyrics(!showLyrics)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all ${
              showLyrics
                ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/40 text-violet-300'
                : 'bg-white/[0.02] border-white/[0.05] text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Telugu Lyrics</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-mute"
              onClick={() => setIsMuted(!isMuted)}
              className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-neutral-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-violet-400" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="player-range w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-500"
              style={{
                background: `linear-gradient(to right, rgb(139, 92, 246) ${isMuted ? 0 : volume}%, rgba(255, 255, 255, 0.1) ${isMuted ? 0 : volume}%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
