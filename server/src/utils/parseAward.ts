import Award, { IAward } from "../models/award";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const toDescription = (object: unknown): string => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data (description)");
  }

  if ("description" in object) {
    if (!isString(object.description)) {
      throw new Error("Description is not of type string");
    }

    return object.description;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseAward = async (award: unknown): Promise<string> => {
  if (!isString(award)) {
    throw new Error("Award title is not of type string");
  }

  const awardInstance = await Award.findOne({ award: award });

  if (awardInstance !== null) {
    throw new Error("A manga with this title already exists");
  }

  return award;
};

const parseDescription = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Description is not of type string");
  }

  return object;
};

// Perhaps eventually ensure that it is indeed a valid country name rather than just a string; will suffice for now
const parseCountry = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Country is not of type string");
  }

  return object;
};

const parseSponsor = (object: unknown): string => {
  if (!isString(object)) {
    throw new Error("Sponsor is not of type string");
  }

  return object;
};

export const toNewAward = async (object: unknown): Promise<IAward> => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "award" in object &&
    "description" in object &&
    "country" in object &&
    "sponsor" in object
  ) {
    const newAward: IAward = {
      award: await parseAward(object.award),
      description: parseDescription(object.description),
      country: parseCountry(object.country),
      sponsor: parseSponsor(object.sponsor),
      manga: [],
    };

    return newAward;
  }

  throw new Error("Incorrect data: a field missing");
};
