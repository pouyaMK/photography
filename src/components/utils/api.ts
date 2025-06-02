// utils/api.ts
import axios from "axios";

export const fetchFolderTree = async () => {
  const res = await axios.get("https://api.lightsostudio.com/api/folder-tree");
  return res.data;
};
