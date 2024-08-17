import { Types, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IAward {
  award: string;
  description: string;
  country?: string;
  sponsor?: string;
  manga: Types.ObjectId[];
}

const awardSchema = new mongoose.Schema<IAward>({
  award: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  country: String,
  sponsor: String,
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
} & Partial<IAward>;

awardSchema.set("toJSON", {
  transform: (_document, returnedObj: ReturnedObj) => {
    returnedObj.id = returnedObj._id!.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

const Award = mongoose.model<IAward>("Award", awardSchema);

export default Award;
