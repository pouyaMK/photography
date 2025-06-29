// utils/api.ts
import api from '@/lib/axios';


export const fetchFolderTree = async () => {
  console.log('Fetching from API…');
  const res = await api.get('/folder-tree');   
  return res.data;
};
