import { IManga } from "../models/manga";
import URL from "url";
import { Demographic, Status } from "./types";
import Author from "../models/author";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseTitle = (title: unknown): string => {
  if (!isString(title)) {
    throw new Error("Title is not of type string");
  }

  return title;
};

const isURL = (url: string): boolean => {
  return Boolean(URL.parse(url));
};

const parseCoverArt = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Cover art is not of type string");
  } else if (!isURL(object)) {
    throw new Error("Cover art is not a url");
  }

  return object;
};

const parseDescription = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Description is not of type string");
  }

  return object;
};

const parseOriginalLanguage = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Original Language is not of type string");
  } else if (object.length > 5) {
    throw new Error(
      "Original Language is not in language code format (https://api.mangadex.org/docs/3-enumerations/#language-codes--localization)"
    );
  }

  return object;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseVolumes = (object: unknown): number | null => {
  if (object === null) {
    return object;
  }

  if (!isNumber(object)) {
    throw new Error("Volumes is not of type number");
  }

  return object;
};

const parseChapters = (object: unknown): number | null => {
  if (object === null) {
    return object;
  }

  if (!isNumber(object)) {
    throw new Error("Chapters is not of type number");
  }

  return object;
};

const isDemographic = (param: string): param is Demographic => {
  return Object.values(Demographic)
    .map((v) => v.toString())
    .includes(param);
};

const parseDemographic = (object: unknown): string => {
  if (!isString(object) || !isDemographic(object)) {
    throw new Error("Incorrect or missing demographic: " + object);
  }

  return object;
};

const isStatus = (param: string): param is Status => {
  return Object.values(Status)
    .map((v) => v.toString())
    .includes(param);
};

const parseStatus = (object: unknown): string => {
  if (!isString(object) || !isStatus(object)) {
    throw new Error("Incorrect or missing status: " + object);
  }

  return object;
};

const parseYear = (object: unknown): number => {
  if (!isNumber(object)) {
    throw new Error("Year is not of type number");
  }

  return object;
};

const parseTags = (object: unknown): string[] => {
  if (!Array.isArray(object)) {
    throw new Error("Tags field is not an array");
  } else if (!object.every((tag) => isString(tag))) {
    throw new Error("Some tags are not of type string");
  }

  return object;
};

const parseAuthor = async (object: unknown) => {
  if (!isString(object)) {
    throw new Error("Author/Artist is not of type string");
  }

  const author = await Author.findOne({ name: object });

  if (author) {
    return author._id;
  }

  const newAuthor = new Author({
    name: object,
    awards: [],
    manga: [],
  });

  await newAuthor.save();

  return newAuthor._id;
};

export const toNewManga = async (object: unknown): Promise<IManga> => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "title" in object &&
    "author" in object &&
    "artist" in object &&
    "coverArt" in object &&
    "description" in object &&
    "originalLanguage" in object &&
    "volumes" in object &&
    "chapters" in object &&
    "demographic" in object &&
    "status" in object &&
    "year" in object &&
    "tags" in object
  ) {
    const newManga: IManga = {
      title: parseTitle(object.title),
      author: await parseAuthor(object.author),
      artist: await parseAuthor(object.artist),
      coverArt: parseCoverArt(object.coverArt),
      description: parseDescription(object.description),
      originalLanguage: parseOriginalLanguage(object.originalLanguage),
      volumes: parseVolumes(object.volumes),
      chapters: parseChapters(object.chapters),
      demographic: parseDemographic(object.demographic),
      status: parseStatus(object.status),
      year: parseYear(object.year),
      tags: parseTags(object.tags),
      awards: [],
    };

    return newManga;
  }

  throw new Error("Incorrect data: a field missing");
};

export const confirmAward = (object: unknown): string => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("award" in object) {
    if (!isString(object.award)) {
      throw new Error("Award name is not of type string");
    }

    return object.award;
  }

  throw new Error("Incorrect data: a field missing");
};
