import { Url } from "url";

export interface IMovie {
    // id: number;
    Title: string;
    Year: number;
    Runtime: string;
    Poster: string
}

export interface IMovieList extends IMovie {
    dateCreated: any
}