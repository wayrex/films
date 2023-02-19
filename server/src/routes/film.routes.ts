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
        const data = await FilmController.createFilmByUrl(body.url);
        res.status(200).send(data);
    } catch (error) {
        logger.warn(`Failed request on ${req.originalUrl}`, error);
        res.status(500).send(error.message);
    }
});

filmRouter.put("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id = req?.params?.id;
        const film = req.body;
        const result = await FilmController.updateFilm(id, film);

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an film: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an film: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an film: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

filmRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id = req?.params?.id;
        const result = await FilmController.deleteFilm(id);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an film: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an film: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an film: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

export default filmRouter;