import React, { useState, useEffect, MouseEvent } from 'react';
import { 
  Plus, Play, Heart, Star, Sparkles, Filter, 
  Trash2, RotateCcw, AlertCircle, Award, Compass, Music, Headphones
} from 'lucide-react';
import { Song, RepeatMode } from './types';
import {
  TELUGU_SONGS,
  TELUGU_ALBUMS,
  TELUGU_ARTISTS,
  STARTUP_SONG,
  getAlbumSongs,
  songMatchesArtist,
} from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import SongCard from './components/SongCard';
import AlbumCard from './components/AlbumCard';
import ArtistCard from './components/ArtistCard';
import PlayerBar from './components/PlayerBar';
import LyricsPane from './components/LyricsPane';
import NowPlayingPanel from './components/NowPlayingPanel';

export default function App() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites state (persisted via localStorage)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('swaram_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Player state — Naatu Naatu starts on app load
  const [currentSong, setCurrentSong] = useState<Song>(STARTUP_SONG);
  const [isPlaying, setIsPlaying] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [showLyrics, setShowLyrics] = useState(false);

  const cycleRepeatMode = () => {
    setRepeatMode((prev) => (prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off'));
  };

  // Write favorites back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('swaram_favorites', JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favoriteIds]);

  // Extract unique genre list from raw song data
  const genres = ['All', ...Array.from(new Set(TELUGU_SONGS.map(s => s.genre)))];

  // Favorite button handler
  const toggleFavorite = (songId: string) => {
    setFavoriteIds((prev) => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId) 
        : [...prev, songId]
    );
  };

  const handleCardToggleFavorite = (e: MouseEvent, songId: string) => {
    e.stopPropagation(); // Prevents auto playing when favoriting
    toggleFavorite(songId);
  };

  // Sound play handler (loads song & fires state)
  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Forward track navigation logic
  const handleNextSong = () => {
    const currentList = getSongsList();
    if (currentList.length === 0) return;

    if (shuffle) {
      let nextSong = currentList[Math.floor(Math.random() * currentList.length)];
      if (currentList.length > 1) {
        while (nextSong.id === currentSong.id) {
          nextSong = currentList[Math.floor(Math.random() * currentList.length)];
        }
      }
      setCurrentSong(nextSong);
    } else {
      const currentIndex = currentList.findIndex(s => s.id === currentSong.id);
      if (currentIndex === -1 || currentIndex === currentList.length - 1) {
        if (repeatMode === 'all') {
          setCurrentSong(currentList[0]);
        } else {
          setIsPlaying(false);
          return;
        }
      } else {
        setCurrentSong(currentList[currentIndex + 1]);
      }
    }
    setIsPlaying(true);
  };

  // Backward track navigation logic
  const handlePreviousSong = () => {
    const currentList = getSongsList();
    if (currentList.length === 0) return;

    const currentIndex = currentList.findIndex(s => s.id === currentSong.id);
    if (currentIndex === -1 || currentIndex === 0) {
      // Loop to end
      setCurrentSong(currentList[currentList.length - 1]);
    } else {
      setCurrentSong(currentList[currentIndex - 1]);
    }
    setIsPlaying(true);
  };

  // Computes active songs subset depending on filters/search
  const getSongsList = (): Song[] => {
    return TELUGU_SONGS.filter(song => {
      // Search Box filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = song.title.toLowerCase().includes(query);
        const matchesArtist = song.artist.toLowerCase().includes(query);
        const matchesAlbum = song.album.toLowerCase().includes(query);
        if (!matchesTitle && !matchesArtist && !matchesAlbum) return false;
      }

      // Genre pill filter
      if (activeGenre !== 'All' && song.genre !== activeGenre) {
        return false;
      }

      // Selected artist circle filter (supports multi-artist tracks)
      if (selectedArtist && !songMatchesArtist(song, selectedArtist)) {
        return false;
      }

      // Selected album bar filter
      if (selectedAlbum && song.album !== selectedAlbum) {
        return false;
      }

      // Favorite toggle
      if (showFavoritesOnly && !favoriteIds.includes(song.id)) {
        return false;
      }

      return true;
    });
  };

  const activeSongs = getSongsList();

  // Helper selectors for interactive sidebar filters
  const handleFilterArtist = (artistName: string) => {
    if (selectedArtist === artistName) {
      setSelectedArtist(null); // Deselect toggle
    } else {
      setSelectedArtist(artistName);
      setSelectedAlbum(null); // Mutually exclusive for clarity
      setActiveGenre('All');
      setShowFavoritesOnly(false);
    }
  };

  const handleFilterAlbum = (albumTitle: string) => {
    if (selectedAlbum === albumTitle) {
      setSelectedAlbum(null);
    } else {
      setSelectedAlbum(albumTitle);
      setSelectedArtist(null);
      setActiveGenre('All');
      setShowFavoritesOnly(false);

      const albumSongs = getAlbumSongs(albumTitle);
      if (albumSongs.length > 0) {
        setCurrentSong(albumSongs[0]);
        setIsPlaying(true);
      }
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveGenre('All');
    setSelectedArtist(null);
    setSelectedAlbum(null);
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#06080e] text-neutral-100 font-sans pb-36 sm:pb-32 md:pb-28">
      {/* Decorative overhead glowing blobs */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[280px] h-[280px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      {/* Persistent Nav Sticky Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeGenre}
        setActiveFilter={setActiveGenre}
        genres={genres}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favoriteCount={favoriteIds.length}
      />

      {/* Main Grid Section */}
      <main className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Spotlight Showcase Hero */}
        {!showFavoritesOnly && !searchQuery && !selectedArtist && !selectedAlbum && activeGenre === 'All' && (
          <Hero 
            onPlaySong={handlePlaySong}
            favoriteIds={favoriteIds}
            toggleFavorite={toggleFavorite}
          />
        )}

        {/* Categories Tab Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-violet-400" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase font-mono">
                Explore Genres
              </h2>
            </div>
            {(activeGenre !== 'All' || selectedArtist || selectedAlbum || searchQuery || showFavoritesOnly) && (
              <button
                id="btn-clear-filters"
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-white font-semibold font-mono bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
          
          {/* Scrollable genre track filter tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setActiveGenre(genre);
                  setSelectedArtist(null);
                  setSelectedAlbum(null);
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer border select-none transition-all ${
                  activeGenre === genre
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500 text-white shadow-md shadow-indigo-600/10'
                    : 'bg-[#111625]/40 border-white/[0.04] text-neutral-400 hover:border-white/10 hover:text-white'
                }`}
              >
                {genre === 'All' ? '🔥 All Hits' : genre}
              </button>
            ))}
          </div>
        </div>

        {/* Content Rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* Left Large Column: Songs Grids */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div>
              {/* Title metric label bar */}
              <div className="flex items-center justify-between mb-4.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                  <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                    {showFavoritesOnly ? 'My Loved Tracks' : 'Telugu Golden Tracks'}
                  </h2>
                </div>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeSongs.length} {activeSongs.length === 1 ? 'song' : 'songs'} matched
                </span>
              </div>

              {/* Grid or Empty list view */}
              {activeSongs.length > 0 ? (
                <div id="songs-grid" className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                  {activeSongs.map((song) => (
                    <SongCard
                      key={song.id}
                      song={song}
                      activeSongId={currentSong?.id || null}
                      isPlaying={isPlaying}
                      isFavorite={favoriteIds.includes(song.id)}
                      onPlay={handlePlaySong}
                      onToggleFavorite={handleCardToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#111625]/20 border border-white/[0.04] space-y-4">
                  <div className="p-4 rounded-full bg-violet-500/10 text-violet-400">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-neutral-100 font-bold text-lg">No Tracks Found</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mt-1">
                      Did not find any songs matching your active criteria. Try adjusting the tags or resetting the search input.
                    </p>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow shadow-violet-500/20 cursor-pointer select-none transition-all"
                  >
                    Clear Filter Criteria
                  </button>
                </div>
              )}
            </div>

            {/* Trending Albums Section (Horizontal Row) */}
            {!showFavoritesOnly && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Headphones className="w-5 h-5 text-violet-400" />
                  <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                    Telugu Blockbuster Albums
                  </h2>
                </div>
                
                <div id="albums-list" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {TELUGU_ALBUMS.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      songCount={getAlbumSongs(album.title).length}
                      isActive={selectedAlbum === album.title}
                      onFilterByAlbum={handleFilterAlbum}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Now Playing + Artists */}
          {!showFavoritesOnly && (
            <div className="md:col-span-5 lg:col-span-4 space-y-6 md:sticky md:top-24">
              <NowPlayingPanel
                currentSong={currentSong}
                isPlaying={isPlaying}
                activeSongs={activeSongs}
                featuredAlbums={TELUGU_ALBUMS.slice(0, 4)}
                onPlaySong={handlePlaySong}
                onFilterAlbum={handleFilterAlbum}
              />

              <div className="p-5 sm:p-6 rounded-2xl bg-[#0e121e]/60 border border-white/[0.05] shadow-xl">
                <div className="flex items-center gap-2 mb-5.5 pb-3 border-b border-white/[0.04]">
                  <Award className="w-5 h-5 text-violet-400 animate-pulse" />
                  <h3 className="font-extrabold text-neutral-100 text-base uppercase tracking-tight font-mono">
                    Top Chart Singers
                  </h3>
                </div>

                <div id="artists-grid" className="grid grid-cols-2 gap-3.5">
                  {TELUGU_ARTISTS.map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                      isActive={selectedArtist === artist.name}
                      onFilterByArtist={handleFilterArtist}
                    />
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.04] text-[11px] text-neutral-400 leading-relaxed font-sans text-center">
                  Click on an album card or singer's avatar to instantly filter their golden discography streams.
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Slide-out Transliterated Telugu Lyrics Pane */}
      {showLyrics && currentSong && (
        <LyricsPane 
          song={currentSong} 
          onClose={() => setShowLyrics(false)} 
        />
      )}

      {/* Floating Interactive Player Bottom Bar */}
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={handleNextSong}
        onPrevious={handlePreviousSong}
        isFavorite={currentSong ? favoriteIds.includes(currentSong.id) : false}
        onToggleFavorite={toggleFavorite}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeatMode={repeatMode}
        onCycleRepeat={cycleRepeatMode}
        showLyrics={showLyrics}
        setShowLyrics={setShowLyrics}
      />
    </div>
  );
}
