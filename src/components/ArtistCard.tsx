import React from 'react';
import { Users, Sparkles } from 'lucide-react';
import { Artist } from '../types';

interface ArtistCardProps {
  key?: string;
  artist: Artist;
  onFilterByArtist: (artistName: string) => void;
  isActive: boolean;
}

export default function ArtistCard({ artist, onFilterByArtist, isActive }: ArtistCardProps) {
  return (
    <div
      id={`artist-card-${artist.id}`}
      onClick={() => onFilterByArtist(artist.name)}
      className={`group flex flex-col items-center text-center p-4 rounded-2xl cursor-pointer select-none transition-all duration-300 ${
        isActive 
          ? 'bg-violet-950/25 border border-violet-500/30 shadow-md shadow-violet-500/5 scale-[1.03]' 
          : 'bg-[#111625]/20 border border-transparent hover:bg-[#151c30]/50 hover:border-white/[0.04]'
      }`}
    >
      {/* Circle Image Wrapper */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-violet-500/60 shadow-lg shadow-black/40 transition-all duration-300">
        <img
          src={artist.image}
          alt={artist.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Decorative inner gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60" />
      </div>

      {/* Artist Text info */}
      <h4 className="font-bold text-neutral-100 text-sm sm:text-base tracking-tight leading-tight group-hover:text-violet-400 transition-colors">
        {artist.name}
      </h4>
      
      <p className="text-[10px] text-neutral-400 font-medium truncate w-full max-w-[120px] mt-0.5">
        {artist.role}
      </p>

      {/* Listeners indicator tag */}
      <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] text-neutral-400 font-mono">
        <Users className="w-3 h-3 text-violet-400" />
        <span>{artist.monthlyListeners} / mo</span>
      </div>
    </div>
  );
}
