import mongoose, { Schema, Document } from 'mongoose';

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

export interface FilmModel {
   title: string;
   description: string;
   type: FilmType;
   extractedFrom: EXTRACTED_TYPE;
   filmId: string;
   url: string;
   siteName: string;
   image: string;
   metadata: string,
   genres: string[],
   actors: string[],
   directors: string[],
   releaseDate: Date,
   isWatched: Boolean
}

type FilmDocument = FilmModel & Document;

const FilmSchema = new Schema<FilmModel>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    extractedFrom: { type: String, required: true },
    filmId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    siteName: { type: String, required: true },
    image: { type: String, required: true },
    metadata: { type: String, required: true },
    genres: [{
        type: String, required: true
    }],
    actors: [{
        type: String, required: true
    }],
    directors: [{
        type: String, required: true
    }],
    releaseDate: { type: Date, required: true },
    isWatched: { type: Boolean, required: true }
}, 
{ timestamps: true });

const Film = mongoose.model<FilmModel>("Film", FilmSchema);
export default Film;