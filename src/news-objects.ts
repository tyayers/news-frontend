export interface News {
  locations: Record<string, Location>;
  articles: Article[];
}

interface Location {
  country: string;
  code: string;
  geometry: {
    location: Geo;
    viewport: {
      northeast: Geo;
      southwest: Geo;
    }
  }
  city: string;
  flag?: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Article {
  source: string;
  region: string;
  language: string;
  icon: string;
  id: string;
  title: string;
  description: string;
  link: string;
  published: string;
  tags: string[];
  location: string;
}

export interface TagNews {
  articlesByTag: Record<string, Article[]>;
}