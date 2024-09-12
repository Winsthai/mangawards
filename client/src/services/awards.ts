import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Award, BasicAward } from "../types";

const getAwardTitles = async (): Promise<{ award: string; id: string }[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/awards?titles=true`);

  return data;
};

const getBasicAwards = async (): Promise<BasicAward[]> => {
  const { data } = await axios.get(`${apiBaseUrl}/awards?basic=true`);

  return data;
};

const getAward = async (id: string): Promise<Award> => {
  const { data } = await axios.get(`${apiBaseUrl}/awards/${id}`);

  return data;
};

export default { getAwardTitles, getBasicAwards, getAward };
