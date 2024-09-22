export interface BasicManga {
  title: string;
  coverArt: string;
  chapters: number | null;
  demographic: string | null;
  status: string;
  year: number | null;
  tags: string[];
  awards: { award: string }[];
  id: string;
}

export interface BasicAward {
  award: string;
  country?: string;
  sponsor?: string;
  id: string;
}

export interface BasicAuthor {
  name: string;
  awards: { award: string }[];
  id: string;
}

export interface Award {
  award: string;
  description: string;
  country?: string;
  sponsor?: string;
  manga: { title: string; id: string }[];
}

export interface Author {
  name: string;
  description?: string;
  awards: { award: string; id: string }[];
  manga: { title: string; id: string }[];
}

export interface Manga {
  title: string;
  author: { name: string; id: string };
  artist: { name: string; id: string };
  coverArt: string;
  description: string | null;
  originalLanguage: string;
  volumes: number | null;
  chapters: number | null;
  demographic: string | null;
  status: string;
  year: number | null;
  tags: string[];
  awards: { award: string; id: string }[];
}

export interface User {
  id: string;
  username: string;
  starredManga: { title: string; id: string }[];
}
