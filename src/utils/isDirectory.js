import { stat } from 'fs/promises';

/**
 * @param {string} path
 *
 * @description Checks if the path is a directory
 *
 * @returns {Promise<boolean>}
 */
const isDirectory = async (path) => {
  const stats = await stat(path);
  return stats.isDirectory();
};

export default isDirectory;