import { JSDOM } from "jsdom";
import { FilmData, FilmThing } from "./interfaces";
import ImdbFilm from "./models/ImdbFilm";
import RottenTomatoesFilm from "./models/RottenTomatoesFilm";

export default class FilmFactory {
  static CreateFilm(filmUrl: string, filmDom: JSDOM, filmData: FilmData): FilmThing {
    const getDomainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/ig;
    const regexResult = getDomainRegex.exec(filmUrl);
    if (regexResult && regexResult[1]) {
      const filmDomain = regexResult[1].toLowerCase();
      if (filmDomain.includes("imdb")) {
        return new ImdbFilm(filmDom, filmData);
      } else if (filmDomain.includes("rotten")) {
        return new RottenTomatoesFilm(filmDom, filmData);
      }
    }
    throw new Error("Film domain not recogniced or supported.");
  }
}