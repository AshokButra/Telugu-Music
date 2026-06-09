import { Disc3, ListMusic, Play, Radio } from 'lucide-react';
import { Song, Album } from '../types';

interface NowPlayingPanelProps {
  currentSong: Song;
  isPlaying: boolean;
  activeSongs: Song[];
  featuredAlbums: Album[];
  onPlaySong: (song: Song) => void;
  onFilterAlbum: (albumTitle: string) => void;
}

export default function NowPlayingPanel({
  currentSong,
  isPlaying,
  activeSongs,
  featuredAlbums,
  onPlaySong,
  onFilterAlbum,
}: NowPlayingPanelProps) {
  const upNext = activeSongs
    .filter((s) => s.id !== currentSong.id)
    .slice(0, 4);

  return (
    <div className="space-y-5">
      {/* Now playing hero */}
      <div className="p-5 rounded-2xl app-main-card-gradient border border-violet-500/20 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Radio className={`w-4 h-4 text-violet-400 ${isPlaying ? 'animate-pulse' : ''}`} />
          <h3 className="font-extrabold text-neutral-100 text-sm uppercase tracking-tight font-mono">
            Now Playing
          </h3>
        </div>

        <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-4">
          <img
            src={currentSong.coverImage}
            alt={currentSong.title}
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

        <h4 className="font-bold text-white text-base truncate">{currentSong.title}</h4>
        <p className="text-xs text-neutral-400 truncate mt-0.5">{currentSong.artist}</p>
        <p className="text-[10px] text-violet-400 font-mono mt-1 truncate">{currentSong.album}</p>
      </div>

      {/* Up next queue */}
      {upNext.length > 0 && (
        <div className="p-5 rounded-2xl app-card-soft">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.04]">
            <ListMusic className="w-4 h-4 text-violet-400" />
            <h3 className="font-extrabold text-neutral-100 text-sm uppercase tracking-tight font-mono">
              Up Next
            </h3>
          </div>
          <div className="space-y-2">
            {upNext.map((song) => (
              <button
                key={song.id}
                onClick={() => onPlaySong(song)}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition-colors text-left group"
              >
                <img
                  src={song.coverImage}
                  alt={song.title}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-200 truncate group-hover:text-violet-300">
                    {song.title}
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate">{song.artist}</p>
                </div>
                <Play className="w-3 h-3 text-neutral-500 group-hover:text-violet-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick album picks */}
      <div className="p-5 rounded-2xl app-card-soft">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.04]">
          <Disc3 className="w-4 h-4 text-violet-400" />
          <h3 className="font-extrabold text-neutral-100 text-sm uppercase tracking-tight font-mono">
            Quick Albums
          </h3>
        </div>
        <div className="space-y-2">
          {featuredAlbums.map((album) => (
            <button
              key={album.id}
              onClick={() => onFilterAlbum(album.title)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors text-left group"
            >
              <img
                src={album.coverImage}
                alt={album.title}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-200 truncate group-hover:text-violet-300">
                  {album.title}
                </p>
                <p className="text-[10px] text-neutral-500 truncate">{album.artist}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
