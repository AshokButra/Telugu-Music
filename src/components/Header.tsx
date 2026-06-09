import { Search, Music, Heart, Sparkles, Palette } from 'lucide-react';
import { AccentColor } from '../types';
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
  accentColor: AccentColor;
  onCycleAccent: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  genres,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoriteCount,
  accentColor,
  onCycleAccent
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full min-w-0 max-w-[100vw] overflow-x-clip border-b border-white/[0.06] app-header-bg backdrop-blur-md px-2 sm:px-4 py-2.5 sm:py-3 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 pt-[max(0.625rem,env(safe-area-inset-top))]">
      {/* Platform Branding */}
      <div className="flex items-center justify-between min-w-0 gap-2">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            setSearchQuery('');
            setActiveFilter('All');
            setShowFavoritesOnly(false);
          }}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl app-logo-gradient shadow-lg group-hover:scale-105 transition-transform">
            <Music className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute -inset-0.5 app-logo-gradient rounded-xl opacity-30 blur group-hover:opacity-75 transition duration-500" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight app-title-gradient bg-clip-text text-transparent">
              Swaram<span className="app-accent-text">.</span>
            </span>
            <span className="block text-[10px] text-neutral-400 font-mono tracking-widest uppercase mt-[-2px]">TELUGU STREAM</span>
          </div>
        </div>

        {/* Favorite toggle for mobile explicitly alongside other triggers */}
        <div className="md:hidden flex items-center gap-1 flex-shrink-0">
          <button
            id="btn-accent-toggle-mobile"
            onClick={onCycleAccent}
            className="p-2 rounded-lg app-card text-neutral-300 app-card-hover transition-all"
            title={`Accent: ${accentColor}`}
          >
            <Palette className="w-3.5 h-3.5 app-accent-text" />
          </button>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold select-none transition-all ${
              showFavoritesOnly
                ? 'app-accent-surface'
              : 'app-card text-neutral-300 app-card-hover'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            <span>({favoriteCount})</span>
          </button>
        </div>
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
            className="w-full app-card text-neutral-100 placeholder-neutral-500 text-sm pl-10 pr-4 py-2.5 rounded-xl focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/20 transition-all font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full app-card text-neutral-400 hover:text-white text-xs app-card-hover transition-all"
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
              ? 'app-accent-surface app-accent-surface-hover shadow-md'
              : 'app-card text-neutral-300 app-card-hover hover:border-violet-500/40'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 ${showFavoritesOnly ? 'fill-current scale-110 animate-pulse' : ''}`} />
          <span>My Favorites</span>
          <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full font-mono font-bold text-neutral-300">{favoriteCount}</span>
        </button>
        <button
          id="btn-accent-toggle"
          onClick={onCycleAccent}
          className="hidden md:flex items-center justify-center p-2.5 rounded-xl app-card text-neutral-300 hover:border-white/20 app-card-hover transition-all"
          title={`Accent: ${accentColor}`}
        >
          <Palette className="w-4 h-4 app-accent-text" />
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
