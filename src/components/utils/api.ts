// utils/api.ts
import axios from "axios";

export const fetchFolderTree = async () => {
  console.log(" Fetching from API...");
  const res = await axios.get("https://api.lightsostudio.com/api/folder-tree");
  return res.data;

};
