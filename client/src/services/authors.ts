import axios from "axios";
import { apiBaseUrl } from "../constants";
import { BasicAuthor } from "../types";

const getAuthorNames = async (): Promise<BasicAuthor[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/authors?basic=true`);

  return data;
};

export default { getAuthorNames };
