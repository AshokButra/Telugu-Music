import { X, Sparkles, Languages, Radio } from 'lucide-react';
import { Song } from '../types';

interface LyricsPaneProps {
  song: Song | null;
  onClose: () => void;
}

export default function LyricsPane({ song, onClose }: LyricsPaneProps) {
  if (!song) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-[#080c15] border-l border-white/[0.08] shadow-2xl flex flex-col pt-14 sm:pt-16 pb-36 sm:pb-28 md:pb-24 overflow-hidden">
      {/* Pane Title Bar */}
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-violet-400 animate-pulse" />
          <h2 className="text-sm font-bold tracking-tight text-white uppercase text-neutral-300 font-mono">
            Swaram Lyrics Center
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Pane Header Meta */}
      <div className="p-6 bg-gradient-to-b from-violet-950/20 to-transparent border-b border-white/[0.03]">
        <div className="flex items-center gap-3">
          <img
            src={song.coverImage}
            alt={song.title}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-lg object-cover border border-white/10"
          />
          <div className="min-w-0">
            <h3 className="font-extrabold text-white text-sm sm:text-base truncate">
              {song.title}
            </h3>
            <p className="text-xs text-neutral-400 truncate mt-0.5">
              {song.artist}
            </p>
          </div>
        </div>
      </div>

      {/* Pane Body Lyrics */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 select-none">
        
        {/* Dynamic Transliterated Lyrics Snippet Header */}
        <div className="flex items-center gap-1.5 text-[10px] text-violet-400 font-semibold font-mono uppercase bg-violet-500/10 px-2.5 py-1 rounded-md w-max">
          <Languages className="w-3 h-3" />
          <span>Telugu Transliterated</span>
        </div>

        {/* Dynamic lyrics lines */}
        <div className="space-y-6">
          {song.lyrics ? (
            song.lyrics.split('...').map((chunk, index) => (
              <p
                key={index}
                className={`text-sm sm:text-base leading-relaxed font-bold transition-all duration-300 hover:text-violet-400 ${
                  index === 0 
                    ? 'text-white text-lg font-extrabold border-l-2 border-violet-500 pl-3' 
                    : 'text-neutral-400'
                }`}
              >
                {chunk.trim()}
              </p>
            ))
          ) : (
            <p className="text-neutral-500 text-xs italic">
              Lyrics snippet not loaded for this track. Enjoy the instrumental vibe!
            </p>
          )}

          {/* Dynamic placeholder karaoke tracking animation line snippet */}
          <div className="pt-6 border-t border-white/[0.04] space-y-2">
            <span className="text-[10px] font-mono text-neutral-500 block uppercase">Track Chorus Loop</span>
            <p className="text-xs sm:text-sm text-neutral-300/80 italic">
              ({song.title} continues in stellar high-definition Dolby digital format...)
            </p>
          </div>
        </div>

        {/* Custom Info Banner */}
        <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-indigo-200/80 leading-relaxed font-sans">
            Swaram utilizes intelligent transliteration to let listeners sing along in Telugu. Lyrics are synced automatically with dynamic progress.
          </p>
        </div>

      </div>
    </div>
  );
}
