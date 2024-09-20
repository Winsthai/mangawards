import axios from "axios";
import { apiBaseUrl } from "../constants";

const login = async (username: string, password: string) => {
  const { data } = await axios.post(`${apiBaseUrl}/login`, {
    username,
    password,
  });

  return data;
};

export default { login };
