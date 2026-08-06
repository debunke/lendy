export interface Author {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  photo_url: string;
  order: number;
  created_at: string;
}

export interface Book {
  id: string;
  author_id: string;
  title: string;
  description: string;
  cover_url: string;
  year: number | null;
  created_at: string;
}
