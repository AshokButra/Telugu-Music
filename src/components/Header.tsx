import { Search, Music, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (genre: string) => void;
  genres: string[];
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (fav: boolean) => void;
  favoriteCount: number;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  genres,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoriteCount
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/[0.06] bg-[#090d16]/85 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 pt-[max(0.625rem,env(safe-area-inset-top))]">
      {/* Platform Branding */}
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            setSearchQuery('');
            setActiveFilter('All');
            setShowFavoritesOnly(false);
          }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-500 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Music className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-xl opacity-30 blur group-hover:opacity-75 transition duration-500" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-indigo-200 bg-clip-text text-transparent">
              Swaram<span className="text-violet-500">.</span>
            </span>
            <span className="block text-[10px] text-neutral-400 font-mono tracking-widest uppercase mt-[-2px]">TELUGU STREAM</span>
          </div>
        </div>

        {/* Favorite toggle for mobile explicitly alongside other triggers */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`md:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold select-none transition-all ${
            showFavoritesOnly 
              ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400' 
              : 'bg-white/[0.02] border-white/[0.08] text-neutral-300 hover:bg-white/[0.05]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-fuchsia-500' : ''}`} />
          <span>({favoriteCount})</span>
        </button>
      </div>

      {/* Main Bar Items */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl md:ml-8">
        {/* Interactive Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (showFavoritesOnly) setShowFavoritesOnly(false);
            }}
            className="w-full bg-[#111625] text-neutral-100 placeholder-neutral-500 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-white/[0.06] focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white/[0.08] text-neutral-400 hover:text-white text-xs hover:bg-white/[0.15] transition-all"
            >
              ×
            </button>
          )}
        </div>

        {/* Quick actions desktop */}
        <button
          onClick={() => {
            setShowFavoritesOnly(!showFavoritesOnly);
            if (!showFavoritesOnly) {
              setSearchQuery('');
            }
          }}
          className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold select-none cursor-pointer transition-all ${
            showFavoritesOnly 
              ? 'bg-gradient-to-r from-fuchsia-500/20 to-violet-500/20 border-fuchsia-500/40 text-fuchsia-300 shadow-md shadow-fuchsia-500/5' 
              : 'bg-[#111625] border-white/[0.06] text-neutral-300 hover:border-violet-500/40 hover:bg-[#151c30]'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 ${showFavoritesOnly ? 'fill-fuchsia-400 stroke-fuchsia-400 scale-110 animate-pulse' : ''}`} />
          <span>My Favorites</span>
          <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full font-mono font-bold text-neutral-300">{favoriteCount}</span>
        </button>
      </div>

      {/* Quick notice metric or prompt badge */}
      <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-transparent py-1.5 px-3 rounded-lg border border-indigo-500/10 text-[11px] text-indigo-300/80">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-pulse" />
        <span>Lossless Telugu FLAC Audio Active</span>
      </div>
    </header>
  );
}
