import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  username: string;
  passwordHash: string;
  starredManga: Types.ObjectId[];
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      // Must be at least 3 characters long, no spaces
      validator: (x: string) => {
        return /^(\w|\d){3,}/.test(x);
      },
      message: "Username needs to be at least 3 characters long with no spaces",
    },
  },
  passwordHash: String,
  starredManga: [
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
} & Partial<IUser>;

userSchema.set("toJSON", {
  transform: (_document, returnedObj: ReturnedObj) => {
    returnedObj.id = returnedObj._id!.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
