export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;
  readingTime: string;
  isPlaceholder?: boolean;
  content: string;
}
