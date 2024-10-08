/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import Manga from "../models/manga";
import { adminConfirmation } from "../utils/middleware";
import { confirmAward, toNewManga } from "../utils/parseManga";
import Author from "../models/author";
import Award from "../models/award";

const mangaRouter = express.Router();

// Get all manga
// Also contains optional title query: ?title=<title> to get a manga of a certain title only
// Or, include ?basic=true to retrieve manga with only limited information
mangaRouter.get("/", async (request, response, next) => {
  try {
    const title = request.query.title;
    const basic = request.query.basic;

    let manga;

    if (title) {
      if (basic) {
        manga = await Manga.find({ title: title })
          .populate([{ path: "awards", select: "award" }])
          .select([
            "-originalLanguage",
            "-author",
            "-artist",
            "-description",
            "-volumes",
            "-id",
          ]);
      } else {
        manga = await Manga.find({ title: title }).populate([
          { path: "author", select: "name" },
          { path: "artist", select: "name" },
          { path: "awards", select: "award" },
        ]);
      }
    } else {
      if (basic) {
        manga = await Manga.find({})
          .populate([{ path: "awards", select: "award" }])
          .select([
            "-originalLanguage",
            "-author",
            "-artist",
            "-description",
            "-volumes",
            "-id",
          ]);
      } else {
        manga = await Manga.find({}).populate([
          { path: "author", select: "name" },
          { path: "artist", select: "name" },
          { path: "awards", select: "award" },
        ]);
      }
    }

    Manga.updateMany({});
    response.json(manga);
  } catch (error) {
    next(error);
  }
});

// Get a single manga based on id
mangaRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    const manga = await Manga.findById(id).populate([
      { path: "author", select: "name" },
      { path: "artist", select: "name" },
      { path: "awards", select: "award" },
    ]);

    response.json(manga);
  } catch (error) {
    next(error);
  }
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

// Delete a manga by id
mangaRouter.delete(
  "/:id",
  adminConfirmation,
  async (request, response, next) => {
    try {
      const result = await Manga.findByIdAndDelete(request.params.id);

      // Manga will naturally be removed from awards as the ObjectId reference will be gone
      // However, if the manga has awards, those awards must be removed from the author and artist
      if (result) {
        const author = await Author.findById(result.author);
        const awards = author!.awards;
        for (const award of result.awards) {
          const index = awards.findIndex((a) => a.equals(award));
          if (index >= 0) {
            awards.splice(index, 1);
          }
        }
        // Delete the author if he has no awards
        if (!awards.length) {
          await Author.findByIdAndDelete(result.author);
        } else {
          await Author.findByIdAndUpdate(result.author, { awards: awards });
        }

        if (!result.author.equals(result.artist)) {
          const artist = await Author.findById(result.artist);
          const awards = artist!.awards;
          for (const award of result.awards) {
            const index = awards.findIndex((a) => a.equals(award));
            if (index >= 0) {
              awards.splice(index, 1);
            }
          }
          // Delete the artist if he has no awards
          if (!awards.length) {
            await Author.findByIdAndDelete(result.artist);
          } else {
            await Author.findByIdAndUpdate(result.artist, { awards: awards });
          }
        }
      } else {
        response
          .status(404)
          .json({ error: `manga with id ${request.params.id} not found` });
      }

      response.status(204).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default mangaRouter;
