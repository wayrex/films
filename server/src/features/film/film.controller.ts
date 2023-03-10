import axios from "axios";
import { JSDOM } from "jsdom";

import FilmFactory from "./film.factory";
import Film, { FilmModel } from "../../schemas/filmSchema";
import { UpdateResult } from "mongodb";

class FilmController {
  static async getFilms(): Promise<FilmModel[]> {
    const films = await Film.find().exec();

    return films;
  }

  static async getFilmById(id: string): Promise<FilmModel> {
    const film = await Film.findOne({ id: id }).exec();
    return film;
  }

  static async createFilmByUrl(filmUrl: string): Promise<FilmModel> {
    const { data } = await axios.get(filmUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const dom = new JSDOM(data);
    const newFilm = FilmFactory.CreateFilm(filmUrl, dom);
    const newFilmDto = new Film(newFilm.getFilm());
    const result = await newFilmDto.save();

    return result;
  }

  static async setWatchedMovie(movieId: string, isWatched: boolean): Promise<UpdateResult> {
    const result = await Film.updateOne({_id: movieId}, {
      isWatched
    }).exec();

    return result;
  }
}

export default FilmController;