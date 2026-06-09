import React from 'react';
import { Disc, ArrowUpRight, Play } from 'lucide-react';
import { Album } from '../types';

interface AlbumCardProps {
  key?: string;
  album: Album;
  songCount: number;
  onFilterByAlbum: (albumTitle: string) => void;
  isActive: boolean;
}

export default function AlbumCard({ album, songCount, onFilterByAlbum, isActive }: AlbumCardProps) {
  return (
    <div
      id={`album-card-${album.id}`}
      onClick={() => onFilterByAlbum(album.title)}
      className={`group relative overflow-hidden rounded-2xl border p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 select-none flex gap-4 items-center app-card app-card-hover ${
        isActive 
          ? 'app-card-strong border-violet-500/50 shadow-md shadow-violet-500/5' 
          : 'border-white/[0.04] hover:border-white/10'
      }`}
    >
      {/* Decorative gradient color flash based on album custom theme */}
      <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full app-accent-glow opacity-5 group-hover:opacity-15 blur-xl transition-opacity pointer-events-none" />

      {/* Album Cover Art */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-neutral-900">
        <img
          src={album.coverImage}
          alt={album.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <div className="p-2 rounded-full app-logo-gradient text-white shadow-lg">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Album Text Data Row */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 justify-between">
          <span className="text-[9px] font-mono uppercase tracking-wider text-violet-400 font-bold">Telugu Album</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        
        <h3 className="font-bold text-neutral-100 text-sm sm:text-base leading-tight truncate mt-0.5 group-hover:text-violet-300 transition-colors">
          {album.title}
        </h3>
        
        <p className="text-xs text-neutral-400 truncate mt-0.5">
          {album.artist}
        </p>

        <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500 font-mono">
          <span>{album.year}</span>
          <span>•</span>
          <span>{songCount} {songCount === 1 ? 'track' : 'tracks'}</span>
          <span>•</span>
          <span className="truncate max-w-[100px] text-neutral-400">{album.genre}</span>
        </div>
      </div>
    </div>
  );
}
