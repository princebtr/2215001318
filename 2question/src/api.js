import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getTopUsers = () => API.get("/users");
export const getTrendingPosts = () => API.get("/posts?type=popular");
export const getFeedPosts = () => API.get("/posts?type=latest");
