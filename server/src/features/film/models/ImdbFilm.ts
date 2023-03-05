import { JSDOM } from "jsdom";
import logger from "../../../logger";
import { FilmThing } from "../interfaces";
import { ImdbMetadataInterface } from "../interfaces/imdb.interface";
import { Film, FilmType, EXTRACTED_TYPE } from "../../../models/film";

interface filmMetaInterface {
  title: string;
  description: string;
  imdbType: string;
  filmId: string;
  url: string;
  siteName: string;
  image: string;
}

export default class ImdbFilm implements FilmThing {

  private _film: Film;
  public get film(): Film {
    return this._film;
  }
  public set film(v: Film) {
    this._film = v;
  }

  private filmMetaProperties: filmMetaInterface = {
    title: 'meta[property="og:title"]',
    description: 'meta[property="og:description"]',
    imdbType: 'meta[property="og:type"]',
    filmId: 'meta[property="imdb:pageConst"]',
    url: 'meta[property="og:url"]',
    siteName: 'meta[property="og:site_name"]',
    image: 'meta[property="og:image"]'
  };

  constructor(dom: JSDOM) {
    // TODO: Dinamically scrap values based on internal array.
    let title = (dom.window.document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content;
    let description = (dom.window.document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.content;
    let imdbType = (dom.window.document.querySelector('meta[property="og:type"]') as HTMLMetaElement)?.content;
    let filmId = (dom.window.document.querySelector('meta[property="imdb:pageConst"]') as HTMLMetaElement)?.content;
    let url = (dom.window.document.querySelector('meta[property="og:url"]') as HTMLMetaElement)?.content;
    let siteName = (dom.window.document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement)?.content;
    let image = (dom.window.document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content;
    let type;
    switch (imdbType) {
      case 'video.movie':
        type = FilmType.MOVIE;
        break;
      case 'video.tv_show':
        type = FilmType.SERIES;
        break;
      default:
        type = FilmType.OTHER
        break;
    }

    let genres, metadata;
    let actors = [] as string[];
    let directors = [] as string[];
    try {
      metadata = dom.window.document.querySelector('script[type="application/ld+json"]').textContent;
      const imdbMetada = JSON.parse(metadata) as ImdbMetadataInterface;
      genres = imdbMetada.genre;
      title = title ?? imdbMetada.name;
      description = description ?? imdbMetada.description;
      url = url ?? imdbMetada.url;
      image = image ?? imdbMetada.image;
    } catch (error: any) {
      // Non-vital information? Continue even if it fails.
      logger.error(`Error retrieving IMDb metadata pulled from page's script: 'script[type="application/ld+json"]'`);
    }
    const newFilm = {
      title,
      description,
      type,
      filmId,
      extractedFrom: EXTRACTED_TYPE.IMDB,
      url,
      siteName,
      image,
      genres,
      metadata,
      actors,
      directors,
      releaseDate: new Date(),
      createdDate: new Date(),
      modifiedDate: new Date()
    };
    this.film = newFilm;
  }
  public getFilm(): Film {
    return this.film;
  }
}