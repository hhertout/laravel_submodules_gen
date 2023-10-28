import { fileURLToPath } from 'url';
import { dirname } from 'path';

describe('Template generator unit tests', () => {
  test('isDirectory test', async () => {
    const url = fileURLToPath(import.meta.url);
    const mainDir = dirname(url);
  });
});
