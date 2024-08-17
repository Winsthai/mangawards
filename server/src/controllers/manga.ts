/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Manga from "../models/manga";
import { adminConfirmation } from "../utils/middleware";
import { toNewManga } from "../utils/parseManga";
import Author from "../models/author";

const mangaRouter = express.Router();

mangaRouter.post("/", adminConfirmation, async (request, response, next) => {
  try {
    // Ensure body is of correct type
    const body = await toNewManga(request.body);

    const manga = new Manga({
      title: body.title,
      author: body.author,
      artist: body.artist,
      coverArt: body.coverArt,
      description: body.description,
      originalLanguage: body.originalLanguage,
      volumes: body.volumes,
      chapters: body.chapters,
      demographic: body.demographic,
      status: body.status,
      year: body.year,
      tags: body.tags,
      awards: [],
    });

    const savedManga = await manga.save();

    // Save manga to author's list of manga
    await Author.findOneAndUpdate(
      { _id: manga.author },
      { $push: { manga: manga._id } }
    );

    // Save manga to artist's list of manga
    if (!manga.artist.equals(manga.author)) {
      await Author.findOneAndUpdate(
        { _id: manga.artist },
        { $push: { manga: manga._id } }
      );
    }

    response.status(201).json(savedManga);
  } catch (error) {
    next(error);
  }
});

export default mangaRouter;
