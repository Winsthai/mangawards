import mongoose from "mongoose";

export interface IAward {
  award: string;
  country?: string;
  sponsor?: string;
}

const awardSchema = new mongoose.Schema<IAward>({
  award: { type: String, required: true },
  country: String,
  sponsor: String,
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
