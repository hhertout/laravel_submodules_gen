import { fileURLToPath } from 'url';
import { dirname } from 'path';
import isDirectory from '../../src/utils/isDirectory.js';
import { readdir } from 'fs/promises';

describe('Template generator unit tests', () => {
  test('isDirectory test', async () => {
    const url = fileURLToPath(import.meta.url);
    const mainDir = dirname(url);
    const isDir = await isDirectory(mainDir);
    expect(isDir).toBe(true);

    const files = await readdir(mainDir);
    files.map(file => {
      if (file.includes('.js')) return file;
    });
    for (let file of files) {
      const res = await isDirectory(`${mainDir}/${file}`);
      expect(res).toBe(false);
    }
  });
});
