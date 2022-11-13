import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL;

// Create Short URL
export const createShortUrl = (newShortUrl) => {
  return axios.post(`${api}shortUrl`, newShortUrl);
};

// Get All Short URLS
export const getAllUrls = () => {
  return axios.get(`${api}shortUrl`);
};

// Get Short URL Care
export const paramsHandler = (value) => {
  return axios.get(`${api}shorturl/${value}`);
};
