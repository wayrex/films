import { JSDOM } from "jsdom";
import logger from "../../../logger";
import { FilmData, FilmThing } from "../interfaces";
import { RottenTomatoesMetadataInterface } from "../interfaces/rottenTomatoes.interface";

import { FilmModel, FilmType, EXTRACTED_TYPE } from "../../../schemas/filmSchema";

export default class RottenTomatoesFilm implements FilmThing {

  private _film: FilmModel;
  public get film(): FilmModel {
    return this._film;
  }
  public set film(v: FilmModel) {
    this._film = v;
  }

  constructor(dom: JSDOM, filmData: FilmData) {
    // TODO: Dinamically scrap values based on internal array.
    let title = (dom.window.document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content;
    let description = (dom.window.document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.content;
    let rottenType = (dom.window.document.querySelector('meta[property="og:type"]') as HTMLMetaElement)?.content;
    let url = (dom.window.document.querySelector('meta[property="og:url"]') as HTMLMetaElement)?.content;
    let siteName = (dom.window.document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement)?.content;
    let image = (dom.window.document.querySelector('meta[property="og:image"]') as HTMLMetaElement)?.content;
    let filmId = `${siteName} - ${title}`;
    let type;
    switch (rottenType) {
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

    let genres, metadata, datePublished;
    let actors = [] as string[];
    let directors = [] as string[];

    try {
      metadata = dom.window.document.querySelector('script[type="application/ld+json"]').textContent;
      const rottenTomatoesMetadata = JSON.parse(metadata) as RottenTomatoesMetadataInterface;
      genres = rottenTomatoesMetadata.genre;
      title = title ?? rottenTomatoesMetadata.name;
      url = url ?? rottenTomatoesMetadata.url;
      if (!image && rottenTomatoesMetadata.image[0]) {
        image = image ?? rottenTomatoesMetadata.image[0].url;
      }
    } catch (error: any) {
      // Non-vital information? Continue even if it fails.
      logger.error(`Error retrieving Rotten Tomatoes metadata pulled from page's script: 'script[type="application/ld+json"]'`);
    }

    this.film = {
      title,
      description,
      type,
      filmId,
      extractedFrom: EXTRACTED_TYPE.ROTTEN_TOMATOES,
      url,
      siteName,
      image,
      genres,
      metadata,
      actors,
      directors,
      releaseDate: new Date(),
      isWatched: false,
      priority: filmData.priority
    };
  }
  public getFilm(): FilmModel {
    return this.film;
  }
}