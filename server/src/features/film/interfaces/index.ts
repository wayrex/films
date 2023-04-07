import { FilmModel } from "../../../schemas/filmSchema";

export interface FilmThing {
  getFilm(): FilmModel;
}

export interface FilmData {
  priority: number
};