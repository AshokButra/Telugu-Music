import { Play, Heart, Award, Sparkles, Flame } from 'lucide-react';
import { Song } from '../types';
import { TELUGU_SONGS } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onPlaySong: (song: Song) => void;
  favoriteIds: string[];
  toggleFavorite: (songId: string) => void;
}

export default function Hero({ onPlaySong, favoriteIds, toggleFavorite }: HeroProps) {
  // We'll feature Naatu Naatu as the Hero Spotlight song (extremely historical for Telugu cinema!)
  const featuredSong = TELUGU_SONGS.find(s => s.title === 'Naatu Naatu') || TELUGU_SONGS[0];
  const isFavorite = favoriteIds.includes(featuredSong.id);

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-950 via-[#101524] to-[#0a0d17] border border-white/[0.06] p-4 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8 shadow-2xl">
      {/* Background radial soft light gradient */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-violet-600/10 blur-[90px] pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-[90px] pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Info Column */}
        <div className="col-span-1 lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider animate-bounce">
            <Award className="w-3.5 h-3.5" />
            <span>Oscar Spotlight Hit</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Naatu Naatu
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base max-w-lg leading-relaxed">
              Experience the global phenomenon that shattered records. Created by M. M. Keeravani with thunderous vocals by Rahul Sipligunj and Kaala Bhairava. Hook steps that shook the world!
            </p>
          </div>

          {/* Details & Tags */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-neutral-300/80">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>100M+ Views & Plays</span>
            </div>
            <span>•</span>
            <span>Album: <strong className="text-white">RRR</strong></span>
            <span>•</span>
            <span>Genre: <strong className="text-white">Dance & Folk</strong></span>
          </div>

          {/* Quick interactive buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
            <button
              id="hero-play-button"
              onClick={() => onPlaySong(featuredSong)}
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-indigo-500/15 cursor-pointer transform hover:-translate-y-0.5 transition-all select-none w-full sm:w-auto"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-white ml-0.5 text-white" />
              </div>
              Play Spotlight Track
            </button>

            <button
              id="hero-favorite-button"
              onClick={() => toggleFavorite(featuredSong.id)}
              className={`flex items-center justify-center gap-2 border px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold cursor-pointer transform hover:-translate-y-0.5 transition-all select-none w-full sm:w-auto ${
                isFavorite 
                  ? 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300' 
                  : 'border-white/[0.1] bg-[#1a2135]/40 text-neutral-300 hover:bg-[#1f2942]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-fuchsia-400 stroke-fuchsia-400' : 'text-neutral-300'}`} />
              {isFavorite ? 'Spotlight Loved' : 'Add to Library'}
            </button>
          </div>
        </div>

        {/* Right Cover/Banner Column */}
        <div className="col-span-1 lg:col-span-15 block lg:col-start-9">
          <div className="relative group mx-auto max-w-[280px] sm:max-w-[320px]">
            {/* Soft decorative shadow layers */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                alt="Naatu Naatu Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Dynamic overlay label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase font-semibold">Track Of The Week</span>
                <span className="text-white font-bold text-lg mt-0.5">Telugu Cinematic Era</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
