import * as express from "express";
import logger from "../logger";
import FilmController from "../features/film/film.controller";

const filmRouter = express.Router();
filmRouter.use(express.json());

filmRouter.get("/", async (req: express.Request, res: express.Response) => {
    try {
        const films = await FilmController.getFilms();

        res.status(200).send(films);
    } catch (error) {
        logger.warn(req.originalUrl)
        res.status(500).send(error.message);
    }
});

filmRouter.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id = req?.params?.id;
        const film = await FilmController.getFilmById(id);

        if (film) {
            res.status(200).send(film);
        } else {
            res.status(404).send(`Failed to find a film: ID ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find a film: ID ${req?.params?.id}`);
    }
});

filmRouter.post("/url", async (req: express.Request, res: express.Response) => {
    try {
        const body = req.body;
        const filmData = body.filmData || {};
        const data = await FilmController.createFilmByUrl(body.url, filmData);
        res.status(200).send(data);
    } catch (error) {
        logger.warn(`Failed request on ${req.originalUrl}`, error);
        res.status(500).send(error.message);
    }
});

filmRouter.post("/:id/watched", async (req: express.Request, res: express.Response) => {
    try {
        const body = req.body;
        const data = await FilmController.setWatchedMovie(req.params.id, body.isWatched);
        res.status(200).send(data);
    } catch (error) {
        logger.warn(`Failed request on ${req.originalUrl}`, error);
        res.status(500).send(error.message);
    }
});

export default filmRouter;