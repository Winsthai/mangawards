import axios from "axios";
import { apiBaseUrl } from "../constants";
import { User } from "../types";

const getUser = async (id: string): Promise<User> => {
  const { data } = await axios.get(`${apiBaseUrl}/user/${id}`);

  return data;
};

export default { getUser };
