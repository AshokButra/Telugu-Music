import React, { MouseEvent } from 'react';
import { Play, Pause, Heart, Star, Disc3 } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  key?: string;
  song: Song;
  activeSongId: string | null;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: (song: Song) => void;
  onToggleFavorite: (e: MouseEvent, songId: string) => void;
}

export default function SongCard({
  song,
  activeSongId,
  isPlaying,
  isFavorite,
  onPlay,
  onToggleFavorite
}: SongCardProps) {
  const isActive = activeSongId === song.id;

  return (
    <div
      id={`song-card-${song.id}`}
      onClick={() => onPlay(song)}
      className={`group relative flex flex-col app-card app-card-hover border rounded-xl sm:rounded-2xl p-3 sm:p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 select-none overflow-hidden ${
        isActive 
          ? 'border-violet-500/50 app-card-strong shadow-lg shadow-violet-500/5' 
          : 'border-white/[0.04] hover:border-white/10'
      }`}
    >
      {/* Decorative gradient flare on hover */}
      <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full app-accent-glow opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none" />

      {/* Album Cover Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 app-card-soft">
        <img
          src={song.coverImage}
          alt={song.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover / Active Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="p-3.5 rounded-full app-logo-gradient text-white shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200">
            {isActive && isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Quick Genre tag */}
        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm border border-white/10 text-[9px] font-mono tracking-wider font-semibold text-neutral-300">
          {song.genre}
        </div>

        {/* Dynamic Wave Icon if Active */}
        {isActive && isPlaying && (
          <div className="absolute bottom-2 right-2 flex items-center gap-[2px] px-2 py-1 rounded-md backdrop-blur-sm app-logo-gradient">
            <span className="w-1 h-3.5 bg-white rounded-full animate-[bounce_1s_infinite_100ms]" />
            <span className="w-1 h-4.5 bg-white rounded-full animate-[bounce_1s_infinite_200ms]" />
            <span className="w-1 h-2.5 bg-white rounded-full animate-[bounce_1s_infinite_300ms]" />
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className={`font-semibold text-sm leading-tight truncate ${isActive ? 'text-violet-400' : 'text-neutral-100 group-hover:text-violet-300 transition-colors'}`}>
            {song.title}
          </h3>
          
          {/* Heart favorite overlay toggle */}
          <button
            id={`heart-btn-${song.id}`}
            onClick={(e) => onToggleFavorite(e, song.id)}
            className="text-neutral-500 app-card-hover p-1 rounded-md transition-colors cursor-pointer hover:text-violet-400"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current app-accent-text scale-110' : ''}`} />
          </button>
        </div>

        <p className="text-xs text-neutral-400 truncate mt-1">
          {song.artist}
        </p>

        {/* Bottom track stats and meta */}
        <div className="mt-auto pt-3 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-white/[0.04]">
          <span className="flex items-center gap-1">
            <Disc3 className="w-3 h-3 text-neutral-600 group-hover:animate-spin" style={{ animationDuration: '4s' }} />
            <span className="truncate max-w-[90px]">{song.album}</span>
          </span>
          <span>{song.duration}</span>
        </div>
      </div>
    </div>
  );
}
