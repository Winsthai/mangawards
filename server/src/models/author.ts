import { Types, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IAuthor {
  name: string;
  description?: string;
  awards: Types.ObjectId[];
  manga: Types.ObjectId[];
}

const authorSchema = new mongoose.Schema<IAuthor>({
  name: { type: String, required: true },
  description: String,
  awards: [{ type: Schema.Types.ObjectId, ref: "Award" }],
  manga: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga",
    },
  ],
});

type ReturnedObj = {
  _id?: mongoose.Types.ObjectId;
  __v?: number;
  id?: string;
} & Partial<IAuthor>;

authorSchema.set("toJSON", {
  transform: (_document, returnedObj: ReturnedObj) => {
    returnedObj.id = returnedObj._id!.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Author = mongoose.model<IAuthor>("Author", authorSchema);

export default Author;
