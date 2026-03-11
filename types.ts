export interface BlogPost {
  id: string;
  slug: string;
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
