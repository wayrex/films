import * as mongodb from "mongodb";

export enum EXTRACTED_TYPE {
   IMDB = 'IMDb',
   ROTTEN_TOMATOES = 'RottenTomatoes'
}

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
   extractedFrom: EXTRACTED_TYPE;
   filmId: string;
   url: string;
   siteName: string;
   image: string;
   metadata: string,
   genres: string[]
}