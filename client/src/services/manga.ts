import axios from "axios";
import { apiBaseUrl } from "../constants";
import { BasicManga } from "../types";

const getAllBasic = async (): Promise<BasicManga[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/manga?basic=true`);

  return data;
};

export default { getAllBasic };
