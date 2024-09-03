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
