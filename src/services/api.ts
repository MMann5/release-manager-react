import axios from "axios";

const HOST = process.env.REACT_APP_API_HOST;

export const getConfig = async () => {
  const config = await axios.get(`${HOST}/config`);
  return config?.data;
};

export const getDataRepo = async (repository: string, env: string) => {
  const infos = await axios.get(`${HOST}/repository/${repository}/env/${env}`);
  return infos?.data;
};

export const getDataAllRepo = async (env: string) => {
  const infos = await axios.get(`${HOST}/repository/env/${env}`);
  return infos?.data;
};
