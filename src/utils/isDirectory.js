import { stat } from 'fs/promises';

const isDirectory = async (path) => {
  const stats = await stat(path);
  return stats.isDirectory();
};

export default isDirectory;