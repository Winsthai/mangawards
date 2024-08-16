import mongoose from "mongoose";

export interface IAdminUser {
  name: string;
  username: string;
  passwordHash: string;
}

const adminUserSchema = new mongoose.Schema<IAdminUser>({
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
  name: String,
  passwordHash: String,
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
