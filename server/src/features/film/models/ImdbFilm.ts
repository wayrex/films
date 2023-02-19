import { JSDOM } from "jsdom";
import logger from "../../../logger";
import { FilmThing, ImdbMetadataInterface } from "../interfaces";
import { Film, FilmType, ExtractedType } from "../../../models/film";

export default class ImdbFilm implements FilmThing {

  private _film: Film;
  public get film(): Film {
    return this._film;
  }
  public set film(v: Film) {
    this._film = v;
  }

  private filmMetaProperties = {
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
    let title = (dom.window.document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content || (dom.window.document.querySelector('meta[name="title"]') as HTMLMetaElement)?.content;
    let description = (dom.window.document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.content || (dom.window.document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content;
    let imdbType = (dom.window.document.querySelector('meta[property="og:type"]') as HTMLMetaElement)?.content || (dom.window.document.querySelector('meta[name="type"]') as HTMLMetaElement)?.content;
    let filmId = (dom.window.document.querySelector('meta[property="imdb:pageConst"]') as HTMLMetaElement)?.content;
    let url = (dom.window.document.querySelector('meta[property="og:url"]') as HTMLMetaElement)?.content;
    let siteName = (dom.window.document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement)?.content;
    let image = (dom.window.document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content || (dom.window.document.querySelector('meta[property="og:image:url"]') as HTMLMetaElement)?.content;
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
      extractedFrom: ExtractedType.IMDB,
      url,
      siteName,
      image,
      // genres,
      metadata
    };
    this.film = newFilm;
  }
  public getFilm(): Film {
    return this.film;
  }
}