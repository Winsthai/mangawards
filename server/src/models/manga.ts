import { Types, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IManga {
  title: string;
  author: Types.ObjectId;
  artist: Types.ObjectId;
  coverArt: string;
  description: string;
  originalLanguage: string;
  volumes: number | null;
  chapters: number | null;
  demographic: string;
  status: string;
  year: number;
  tags: string[];
  awards: Types.ObjectId[];
}

const mangaSchema = new mongoose.Schema<IManga>({
  title: { type: String, required: true, unique: true },
  author: { type: Schema.Types.ObjectId, ref: "Author" },
  artist: { type: Schema.Types.ObjectId, ref: "Author" },
  coverArt: { type: String, required: true },
  description: { type: String, required: true },
  originalLanguage: { type: String, required: true },
  volumes: { type: Number },
  chapters: { type: Number },
  demographic: { type: String, required: true },
  status: { type: String, required: true },
  year: { type: Number, required: true },
  tags: [{ type: String, required: true }],
  awards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Award",
    },
  ],
});

type ReturnedObj = {
  _id?: mongoose.Types.ObjectId;
  __v?: number;
  id?: string;
} & Partial<IManga>;

mangaSchema.set("toJSON", {
  transform: (_document, returnedObj: ReturnedObj) => {
    returnedObj.id = returnedObj._id!.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Manga = mongoose.model<IManga>("Manga", mangaSchema);

export default Manga;
