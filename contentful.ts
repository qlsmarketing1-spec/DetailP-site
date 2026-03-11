import { BlogPost } from './types';

const SPACE_ID = process.env.Contentful_space_ID;
const ACCESS_TOKEN = process.env.Contentful_access_token;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

let postsCache: BlogPost[] | null = null;

function mapEntry(entry: any, assets: any[]): BlogPost {
  const fields = entry.fields;

  let imageUrl = '';
  if (fields.image?.sys?.id) {
    const asset = assets.find((a: any) => a.sys.id === fields.image.sys.id);
    if (asset?.fields?.file?.url) {
      imageUrl = `https:${asset.fields.file.url}`;
    }
  }

  return {
    id: entry.sys.id,
    slug: fields.slug,
    title: fields.title,
    description: fields.description,
    image: imageUrl,
    imageAlt: fields.imageAlt || fields.title,
    category: fields.category,
    date: fields.date,
    readingTime: fields.readingTime,
    content: fields.content,
  };
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (postsCache) return postsCache;

  const res = await fetch(
    `${BASE_URL}/entries?content_type=blogPost&order=-fields.date&access_token=${ACCESS_TOKEN}`
  );

  if (!res.ok) throw new Error(`Contentful fetch failed: ${res.status}`);

  const data = await res.json();
  const assets: any[] = data.includes?.Asset ?? [];

  postsCache = data.items.map((entry: any) => mapEntry(entry, assets));
  return postsCache!;
}
