import { Film } from "../../../models/film";
export interface ItemReviewed {
  "@type": string;
  url: string;
}

export interface Author {
  "@type": string;
  name: string;
}

export interface Review {
  "@type": string;
  itemReviewed: ItemReviewed;
  author: Author;
  dateCreated: string;
  inLanguage: string;
  name: string;
  reviewBody: string;
}

export interface AggregateRating {
  "@type": string;
  ratingCount: number;
  bestRating: number;
  worstRating: number;
  ratingValue: number;
}

export interface Thumbnail {
  "@type": string;
  contentUrl: string;
}

export interface Trailer {
  "@type": string;
  name: string;
  embedUrl: string;
  thumbnail: Thumbnail;
  thumbnailUrl: string;
  url: string;
  description: string;
  duration: string;
  uploadDate: Date;
}

export interface Actor {
  "@type": string;
  url: string;
  name: string;
}

export interface Director {
  "@type": string;
  url: string;
  name: string;
}

export interface Creator {
  "@type": string;
  url: string;
  name: string;
}

export interface ImdbMetadataInterface {
  "@context": string;
  "@type": string;
  url: string;
  name: string;
  image: string;
  description: string;
  review: Review;
  aggregateRating: AggregateRating;
  contentRating: string;
  genre: string[];
  datePublished: string;
  keywords: string;
  trailer: Trailer;
  actor: Actor[];
  director: Director[];
  creator: Creator[];
  duration: string;
}
export interface FilmThing {
  getFilm(): Film;
}