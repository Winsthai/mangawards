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
