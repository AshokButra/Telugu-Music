import React, { useEffect, useState, useRef, ChangeEvent, useCallback } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Repeat1,
  BookOpen, AlertCircle, Minus, Plus, Volume2
} from 'lucide-react';
import { Song, RepeatMode } from '../types';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  shuffle: boolean;
  setShuffle: (shuf: boolean) => void;
  repeatMode: RepeatMode;
  onCycleRepeat: () => void;
  showLyrics: boolean;
  setShowLyrics: (show: boolean) => void;
  visible: boolean;
}

const formatTime = (secs: number) => {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const total = Math.floor(secs);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

const VOLUME_STEP = 10;

export default function PlayerBar({
  currentSong,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious,
  shuffle,
  setShuffle,
  repeatMode,
  onCycleRepeat,
  showLyrics,
  setShowLyrics,
  visible
}: PlayerBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onNextRef = useRef(onNext);
  const repeatModeRef = useRef(repeatMode);
  const isPlayingRef = useRef(isPlaying);
  const volumeRef = useRef(volume);

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
    volumeRef.current = volume;
  }, [volume]);

  const adjustVolume = useCallback((delta: number) => {
    setVolume((prev) => Math.min(100, Math.max(0, prev + delta)));
  }, []);

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
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = volume === 0;
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        adjustVolume(VOLUME_STEP);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        adjustVolume(-VOLUME_STEP);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adjustVolume]);

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

  const repeatButton = (id: string) => (
    <button
      id={id}
      onClick={onCycleRepeat}
      className={`relative p-1.5 rounded-lg transition-colors cursor-pointer ${
        repeatActive ? 'app-accent-text' : 'text-neutral-500 hover:text-white'
      }`}
      title={repeatTitle}
    >
      {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
      {repeatMode === 'one' && (
        <span className="absolute -top-0.5 -right-0.5 text-[8px] font-extrabold app-accent-text leading-none">
          1
        </span>
      )}
    </button>
  );

  const playPauseButton = (
    <button
      id="btn-play-pause"
      onClick={handlePlayPause}
      className={`p-2 sm:p-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0 ${
        hasError
          ? 'bg-rose-600 hover:bg-rose-500 text-white'
          : 'bg-white hover:bg-neutral-100 text-black'
      }`}
      title={hasError ? 'Load Error! Click to Retry.' : (isPlaying ? 'Pause' : 'Play')}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current app-accent-text border-t-transparent rounded-full animate-spin" />
      ) : hasError ? (
        <AlertCircle className="w-5 h-5 text-white stroke-[2.5px]" />
      ) : isPlaying ? (
        <Pause className="w-5 h-5 fill-current text-black" />
      ) : (
        <Play className="w-5 h-5 fill-current text-black ml-0.5" />
      )}
    </button>
  );

  const volumeControls = (prefix: string) => (
    <div className="flex items-center gap-1">
      <button
        id={`btn-volume-down-${prefix}`}
        onClick={() => adjustVolume(-VOLUME_STEP)}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
        title="Volume down"
        aria-label="Volume down"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="text-[10px] font-mono text-neutral-500 w-7 text-center">{volume}</span>
      <button
        id={`btn-volume-up-${prefix}`}
        onClick={() => adjustVolume(VOLUME_STEP)}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-white transition-colors"
        title="Volume up"
        aria-label="Volume up"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-50 border-t border-white/[0.08] shadow-2xl backdrop-blur-2xl pb-[env(safe-area-inset-bottom)] app-player-bg app-player-shell transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="app-player-inner md:max-w-7xl pt-2.5 sm:pt-3">
        <input
          type="range"
          min={0}
          max={totalDuration}
          step={0.1}
          value={Math.min(currentTime, totalDuration)}
          onChange={handleSeek}
          className="player-range w-full h-2 sm:h-1.5 md:h-1 focus:outline-none rounded-lg appearance-none cursor-pointer accent-violet-500 transition-all"
          style={{
            background: `linear-gradient(to right, rgba(var(--accent-rgb), 1) ${progressPercentage}%, rgba(255, 255, 255, 0.1) ${progressPercentage}%)`
          }}
        />
        <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden app-player-inner pb-2.5 pt-1 space-y-2 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-neutral-900">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <h4 className="font-bold text-neutral-100 text-xs truncate">{currentSong.title}</h4>
            <p className="text-[10px] text-neutral-400 truncate">{currentSong.artist}</p>
          </div>
          <Volume2 className="w-3.5 h-3.5 app-accent-text flex-shrink-0" />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-0">
          <button
            id="btn-shuffle-mobile"
            onClick={() => setShuffle(!shuffle)}
            className={`p-1 rounded-lg flex-shrink-0 ${shuffle ? 'app-accent-text' : 'text-neutral-500'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button id="btn-prev-mobile" onClick={onPrevious} className="p-1 text-neutral-300 flex-shrink-0">
            <SkipBack className="w-4 h-4 fill-current" />
          </button>
          <div className="flex-shrink-0">{playPauseButton}</div>
          <button id="btn-next-mobile" onClick={onNext} className="p-1 text-neutral-300 flex-shrink-0">
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
          <div className="flex-shrink-0">{repeatButton('btn-loop-mobile')}</div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            id="btn-lyrics-toggle-mobile"
            onClick={() => setShowLyrics(!showLyrics)}
            className={`p-1 rounded-lg border transition-all ${
              showLyrics
                ? 'border-white/20 app-accent-text'
                : 'border-white/[0.06] text-neutral-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>
          {volumeControls('mobile')}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 md:px-8 py-3 items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0 w-1/4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow bg-neutral-900">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
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
        </div>

        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <button
            id="btn-shuffle"
            onClick={() => setShuffle(!shuffle)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              shuffle ? 'app-accent-text' : 'text-neutral-500 hover:text-white'
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

        <div className="flex items-center justify-end gap-3 w-1/4">
          <button
            id="btn-lyrics-toggle"
            onClick={() => setShowLyrics(!showLyrics)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all ${
              showLyrics
                ? 'border-white/20 app-accent-text'
                : 'bg-white/[0.02] border-white/[0.05] text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Telugu Lyrics</span>
          </button>
          {volumeControls('desktop')}
        </div>
      </div>
    </div>
  );
}
