import * as mongodb from "mongodb";

// export type ExtractedType = 'IMDb';
export enum ExtractedType {
   IMDB = 'IMDb'
}
// export type FilmType = 'Movie' | 'Series';
export enum FilmType {
   MOVIE = 'Movie',
   SERIES = 'Series',
   OTHER = 'Other',
}
export enum ReadingTypes {
   Some = 'some',
   Variants = 'variants',
   Of = 'of',
   Strings = 'strings',
}

export interface Film {
   _id?: mongodb.ObjectId;
   title: string;
   description: string;
   type: FilmType;
   extractedFrom: ExtractedType;
   filmId: string;
   url: string;
   siteName: string;
   image: string;
   metadata: string
}