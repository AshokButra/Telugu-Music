import { Song, Album, Artist } from './types';

export const PUBLIC_AUDIO = {
  naatuNaatu: '/audio/naatu-naatu.mp3',
  aayaSher: '/audio/aaya-sher.mp3',
} as const;

export const TELUGU_SONGS: Song[] = [
  {
    id: 'song-1',
    title: 'Samajavaragamana',
    artist: 'Sid Sriram',
    album: 'Ala Vaikunthapurramuloo',
    duration: '3:41',
    durationInSeconds: 221,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=480&auto=format&fit=crop&q=80',
    genre: 'Melody',
    year: '2020',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: 'Mera mera merupuvalaa... Sashi vadanaa... Samajavaragamana sasi vadanaa sasi rekhaa parama sushamaa kiranamaa...'
  },
  {
    id: 'song-2',
    title: 'Butta Bomma',
    artist: 'Armaan Malik',
    album: 'Ala Vaikunthapurramuloo',
    duration: '3:18',
    durationInSeconds: 198,
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=480&auto=format&fit=crop&q=80',
    genre: 'Dance & Rythm',
    year: '2020',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    lyrics: 'Buttabomma Buttabomma nannu suthukonive... Zindagike attabommai janta kattukonive...'
  },
  {
    id: 'song-3',
    title: 'Inkem Inkem Inkem Kaavaale',
    artist: 'Sid Sriram',
    album: 'Geetha Govindam',
    duration: '4:24',
    durationInSeconds: 264,
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&auto=format&fit=crop&q=80',
    genre: 'Romantic Melody',
    year: '2018',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    lyrics: 'Inkem inkem inkem kaavaale, chaale idhi chaale... Nuvve dorikina ee nimishaaniki, inkem inkem kaavaale...'
  },
  {
    id: 'song-4',
    title: 'Naatu Naatu',
    artist: 'Rahul Sipligunj, Kaala Bhairava',
    album: 'RRR',
    duration: '3:36',
    durationInSeconds: 216,
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=480&auto=format&fit=crop&q=80',
    genre: 'High Energy Dance',
    year: '2022',
    streamUrl: PUBLIC_AUDIO.naatuNaatu,
    audioUrl: PUBLIC_AUDIO.naatuNaatu,
    lyrics: 'Poleramma jathatlo paatharesi poyyetu... Naatu naatu naatu naatu veera naatu...'
  },
  {
    id: 'song-13',
    title: 'Aaya Sher',
    artist: 'Anirudh Ravichander, Jangi Reddy, Arjun Chandy',
    album: 'The Paradise',
    duration: '4:48',
    durationInSeconds: 288,
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&auto=format&fit=crop&q=80',
    genre: 'Mass Folk Beat',
    year: '2026',
    streamUrl: PUBLIC_AUDIO.aayaSher,
    audioUrl: PUBLIC_AUDIO.aayaSher,
    lyrics: 'Pottu pottu aakalundhi aaya sher... Mettu mettu ekkuthara aaya sher... Peru pathaa leynonni raa aaya sher... Choosko Paradise ku addresaitha aaya sher...'
  },
  {
    id: 'song-5',
    title: 'Oo Antava',
    artist: 'Indravathi Chauhan',
    album: 'Pushpa: The Rise',
    duration: '3:47',
    durationInSeconds: 227,
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=480&auto=format&fit=crop&q=80',
    genre: 'Folk Beat',
    year: '2021',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    lyrics: 'Oo antava maava, oo oo antava maava... Koka koka koka kadithe kallaipodathaaru...'
  },
  {
    id: 'song-6',
    title: 'Priyathama Priyathama',
    artist: 'Chinmayi Sripada',
    album: 'Majili',
    duration: '4:03',
    durationInSeconds: 243,
    coverImage: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=480&auto=format&fit=crop&q=80',
    genre: 'Emotional Romantic',
    year: '2019',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    lyrics: 'Priyathama priyathama manasune vadhili vellake... Praaname neevani parimalinche kshanamidhe...'
  },
  {
    id: 'song-7',
    title: 'Ramuloo Ramulaa',
    artist: 'Anurag Kulkarni, Mangli',
    album: 'Ala Vaikunthapurramuloo',
    duration: '4:05',
    durationInSeconds: 245,
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=480&auto=format&fit=crop&q=80',
    genre: 'Folk Pop',
    year: '2020',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    lyrics: 'Ramuloo Ramulaa nannu gundello pettesukoroo... Neetho dosti chesinaake pichodu aipoyaro...'
  },
  {
    id: 'song-8',
    title: 'Srivalli',
    artist: 'Sid Sriram',
    album: 'Pushpa: The Rise',
    duration: '3:44',
    durationInSeconds: 224,
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=480&auto=format&fit=crop&q=80',
    genre: 'Melody Pop',
    year: '2021',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    lyrics: 'Choope bangaramayeene srivalli, maate maanikyamayene... Choopullo nee choopu nannellipoti unte...'
  },
  {
    id: 'song-9',
    title: 'Choosi Chudangane',
    artist: 'Anurag Kulkarni',
    album: 'Chalo',
    duration: '4:09',
    durationInSeconds: 249,
    coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=480&auto=format&fit=crop&q=80',
    genre: 'Youthful Rom-Com',
    year: '2018',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    lyrics: 'Choosi chudangane nachasave, adigo ala gundello moolana koorchunnave...'
  },
  {
    id: 'song-10',
    title: 'Adiga Adiga',
    artist: 'Sid Sriram',
    album: 'Ninnu Kori',
    duration: '3:45',
    durationInSeconds: 225,
    coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7a4c3?w=480&auto=format&fit=crop&q=80',
    genre: 'Melancholy Romantic',
    year: '2017',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    lyrics: 'Adiga adiga nela thadiga.. Kurise nee gnaapakalalo.. Alalalle tharimi tharimi munchuthunte nannILA...'
  },
  {
    id: 'song-11',
    title: 'Vachindamma',
    artist: 'Sid Sriram',
    album: 'Geetha Govindam',
    duration: '4:01',
    durationInSeconds: 241,
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&auto=format&fit=crop&q=80',
    genre: 'Festive Melody',
    year: '2018',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    lyrics: 'Vachindamma vachindamma tholakari sirivennela aiyyeee... Pachadanam parichindamma panduga kalalanti chithramila...'
  },
  {
    id: 'song-12',
    title: 'Maate Vinadhuga',
    artist: 'Sid Sriram',
    album: 'Taxiwaala',
    duration: '4:35',
    durationInSeconds: 275,
    coverImage: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=480&auto=format&fit=crop&q=80',
    genre: 'Indie Melody',
    year: '2018',
    streamUrl: '#',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    lyrics: 'Maate vinadhuga ee manasu, chebite vinale dhey... Thane thirigi nee venake parugidadhee manasey...'
  }
];

export const TELUGU_ALBUMS: Album[] = [
  {
    id: 'album-4',
    title: 'RRR',
    artist: 'M. M. Keeravani',
    year: '2022',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=480&auto=format&fit=crop&q=80',
    genre: 'Epic Cinematic & Mass',
    accentColor: 'from-red-600 to-red-950/80'
  },
  {
    id: 'album-5',
    title: 'The Paradise',
    artist: 'Anirudh Ravichander',
    year: '2026',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480&auto=format&fit=crop&q=80',
    genre: 'Mass Folk & Action',
    accentColor: 'from-orange-600 to-orange-950/80'
  },
  {
    id: 'album-1',
    title: 'Ala Vaikunthapurramuloo',
    artist: 'Thaman S',
    year: '2020',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=480&auto=format&fit=crop&q=80',
    genre: 'Multiverse/Pop Hits',
    accentColor: 'from-amber-600 to-amber-950/80'
  },
  {
    id: 'album-2',
    title: 'Pushpa: The Rise',
    artist: 'Devi Sri Prasad (DSP)',
    year: '2021',
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=480&auto=format&fit=crop&q=80',
    genre: 'Mass Folk & Melody',
    accentColor: 'from-emerald-600 to-emerald-950/80'
  },
  {
    id: 'album-3',
    title: 'Geetha Govindam',
    artist: 'Gopi Sundar',
    year: '2018',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&auto=format&fit=crop&q=80',
    genre: 'Romantic Pure Melody',
    accentColor: 'from-pink-600 to-pink-950/80'
  },
];

export const STARTUP_SONG =
  TELUGU_SONGS.find((song) => song.title === 'Naatu Naatu') ?? TELUGU_SONGS[0];

export const getAlbumSongs = (albumTitle: string): Song[] =>
  TELUGU_SONGS.filter((song) => song.album === albumTitle);

export const songMatchesArtist = (song: Song, artistName: string): boolean =>
  song.artist.split(',').some((name) => name.trim() === artistName);

export const TELUGU_ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Sid Sriram',
    role: 'Playback Singer / Composer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=480&auto=format&fit=crop&q=80', // Using generic beautiful portrait
    bio: 'Sid Sriram is an Indian-American music producer, playback singer, and songwriter. He is primarily known for his blockbuster melodies in Telugu and Tamil.',
    monthlyListeners: '8.4M'
  },
  {
    id: 'artist-2',
    name: 'Anurag Kulkarni',
    role: 'Playback Singer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&auto=format&fit=crop&q=80',
    bio: 'Anurag Kulkarni is a highly versatile Telugu playback singer who won hearts with highly energetic songs like Ramuloo Ramulaa and melodious tracks.',
    monthlyListeners: '3.1M'
  },
  {
    id: 'artist-3',
    name: 'Chinmayi Sripada',
    role: 'Playback Singer / Voice Artist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=480&auto=format&fit=crop&q=80',
    bio: 'Chinmayi Sripada is an Indian playback singer, voice actor and television presenter of incredible range and precision, winning multiple Nandi Awards.',
    monthlyListeners: '2.8M'
  },
  {
    id: 'artist-4',
    name: 'Armaan Malik',
    role: 'Playback Singer / Artist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&auto=format&fit=crop&q=80',
    bio: 'Armaan Malik is a multi-talented Bollywood as well as South-Indian playback singer known for his super romantic voice behind massive hits like Butta Bomma.',
    monthlyListeners: '14.2M'
  },
  {
    id: 'artist-5',
    name: 'Anirudh Ravichander',
    role: 'Music Director / Playback Singer',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&auto=format&fit=crop&q=80',
    bio: 'Anirudh Ravichander is one of South India\'s biggest music composers, delivering chart-topping mass beats and melodies across Tamil and Telugu cinema.',
    monthlyListeners: '18.6M'
  }
];
