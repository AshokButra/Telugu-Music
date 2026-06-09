export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationInSeconds: number;
  coverImage: string;
  genre: string;
  year: string;
  streamUrl: string;
  audioUrl: string;
  lyrics?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverImage: string;
  genre: string;
  accentColor: string; // Tailwind bg gradient representation e.g. "from-violet-600 to-indigo-950"
}

export type RepeatMode = 'off' | 'all' | 'one';
export type AccentColor = 'purple' | 'emerald' | 'rose' | 'amber' | 'sky';

export interface Artist {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  monthlyListeners: string;
}
