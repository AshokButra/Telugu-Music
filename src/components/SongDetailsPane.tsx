import { X, Disc3, Music2, Calendar, Clock, Tag } from 'lucide-react';
import { Song } from '../types';

interface SongDetailsPaneProps {
  song: Song | null;
  isPlaying: boolean;
  onClose: () => void;
}

export default function SongDetailsPane({ song, isPlaying, onClose }: SongDetailsPaneProps) {
  if (!song) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-[100vw] sm:w-96 app-card-strong border-l border-white/[0.08] shadow-2xl flex flex-col pt-14 sm:pt-16 pb-36 sm:pb-28 md:pb-24 overflow-hidden overflow-x-clip">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music2 className="w-4 h-4 app-accent-text" />
          <h2 className="text-sm font-bold tracking-tight uppercase text-neutral-300 font-mono">
            Song Details
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          aria-label="Close song details"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 app-main-card-gradient border-b border-white/[0.03]">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-5">
            <img
              src={song.coverImage}
              alt={song.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            {isPlaying && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                <span className="w-1 h-3 bg-violet-400 rounded-full animate-[bounce_1s_infinite_100ms]" />
                <span className="w-1 h-5 bg-violet-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                <span className="w-1 h-2.5 bg-violet-400 rounded-full animate-[bounce_1s_infinite_300ms]" />
              </div>
            )}
          </div>

          <h3 className="font-extrabold text-white text-lg leading-tight">{song.title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{song.artist}</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl app-card-soft">
            <Disc3 className="w-4 h-4 app-accent-text mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Album</p>
              <p className="text-sm font-semibold text-neutral-200 mt-0.5">{song.album}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl app-card-soft">
              <Tag className="w-3.5 h-3.5 app-accent-text mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase text-neutral-500">Genre</p>
                <p className="text-xs font-semibold text-neutral-200 mt-0.5 truncate">{song.genre}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3.5 rounded-xl app-card-soft">
              <Calendar className="w-3.5 h-3.5 app-accent-text mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-mono uppercase text-neutral-500">Year</p>
                <p className="text-xs font-semibold text-neutral-200 mt-0.5">{song.year}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl app-card-soft">
            <Clock className="w-4 h-4 app-accent-text mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase text-neutral-500">Duration</p>
              <p className="text-sm font-semibold text-neutral-200 mt-0.5">{song.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
