import * as mongodb from "mongodb";
import axios from "axios";
import { JSDOM } from "jsdom";

import { collections } from "../../database";
import { Film } from "../../models/film";
import FilmFactory from "./film.factory";

class FilmController {
  static async getFilms(): Promise<Film[]> {
    const films = await collections.films.find({}).toArray();

    return films;
  }

  static async getFilmById(id: string): Promise<Film> {
    const query = { _id: new mongodb.ObjectId(id) };
    const film = await collections.films.findOne(query);

    return film;
  }

  static async createFilmByUrl(filmUrl: string): Promise<mongodb.InsertOneResult<Film>> {
    const { data } = await axios.get(filmUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const dom = new JSDOM(data);
    const newFilm = FilmFactory.CreateFilm(filmUrl, dom);
    const result = await collections.films.insertOne(newFilm.getFilm());

    return result;
  }

  static async createFilm(film: any): Promise<mongodb.InsertOneResult<Film>> {
    const result = await collections.films.insertOne(film);

    return result;
  }

  static async updateFilm(id: string, newFilm: any): Promise<mongodb.UpdateResult> {
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.films.updateOne(query, { $set: newFilm });

    return result;
  }

  static async deleteFilm(id: string): Promise<mongodb.DeleteResult> {
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.films.deleteOne(query);

    return result;
  }
}

export default FilmController;