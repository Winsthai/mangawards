/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Manga from "../models/manga";
import { adminConfirmation } from "../utils/middleware";
import { confirmAward, toNewManga } from "../utils/parseManga";
import Author from "../models/author";
import Award from "../models/award";

const mangaRouter = express.Router();

// Get all manga
mangaRouter.get("/", async (_request, response) => {
  const manga = await Manga.find({}).populate([
    { path: "author", select: "name" },
    { path: "artist", select: "name" },
    { path: "awards", select: "award" },
  ]);
  Manga.updateMany({});
  response.json(manga);
});

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

// Add an award (by name) to a manga (and vice versa) as well as add the award to the manga author
mangaRouter.post("/:id", adminConfirmation, async (request, response, next) => {
  try {
    const id = request.params.id;

    const manga = await Manga.findById(id);

    // Check that manga exists
    if (!manga) {
      response.status(400).json({ error: "manga id does not exist" });
      return;
    }

    // Body should contain string value
    const body = confirmAward(request.body);

    // Check that award exists, add manga to award
    const award = await Award.findOneAndUpdate(
      { award: body },
      { $push: { manga: manga._id } }
    );

    if (!award) {
      response.status(400).json({ error: "award does not exist" });
      return;
    }

    // Add award to author
    const author = await Author.findOneAndUpdate(
      { _id: manga.author },
      { $push: { awards: award._id } }
    );

    if (!manga.author.equals(manga.artist)) {
      const artist = await Author.findOneAndUpdate(
        { _id: manga.artist },
        { $push: { awards: award._id } }
      );

      if (!artist) {
        response
          .status(400)
          .json({ error: "manga does not have a valid author" });
        return;
      }
    }

    if (!author) {
      response
        .status(400)
        .json({ error: "manga does not have a valid author" });
      return;
    }

    // Add award to manga
    manga.awards.push(award._id);

    const savedManga = await manga.save();

    response.status(200).json(savedManga);
  } catch (error) {
    next(error);
  }
});

export default mangaRouter;
