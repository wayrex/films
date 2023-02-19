export interface Image {
  "@type": string;
  url: string;
}

export interface AggregateRating {
  "@type": string;
  name: string;
  description: string;
  bestRating: string;
  worstRating: string;
  reviewCount: number;
  ratingCount: number;
  ratingValue: string;
}

export interface Actor {
  "@type": string;
  sameAs: string;
  image: string;
}

export interface Video {
  "@type": string;
  thumbnailUrl: string;
  name: string;
  duration: string;
  sourceOrganization: string;
}

export interface Episode {
  "@type": string;
  url: string;
}

export interface PartOfSeries {
  "@type": string;
  name: string;
  url: string;
  startDat: string;
}

export interface RottenTomatoesMetadataInterface {
  "@context": string;
  "@type": string;
  url: string;
  name: string;
  startDate: string;
  image: Image[];
  aggregateRating: AggregateRating;
  actor: Actor[];
  video: Video[];
  episode: Episode[];
  genre: string[];
  seasonNumber: string;
  partOfSeries: PartOfSeries;
  review?: any;
}