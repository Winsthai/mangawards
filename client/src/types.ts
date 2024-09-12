export interface BasicManga {
  title: string;
  coverArt: string;
  chapters: number | null;
  demographic: string | null;
  status: string;
  year: number | null;
  tags: string[];
  awards: { award: string }[];
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
}

export interface Award {
  award: string;
  description: string;
  country?: string;
  sponsor?: string;
  manga: { title: string; id: string }[];
}
