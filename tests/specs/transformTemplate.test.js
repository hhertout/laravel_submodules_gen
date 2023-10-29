import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

describe('Transform the template format', () => {

  test("Transform is ok", async () => {
    const url = fileURLToPath(import.meta.url);
    const baseDir = dirname(url);
    const template = await readFile(baseDir + '/../data/transform.template', 'utf8');
    const t = JSON.stringify(encodeURIComponent(template));
    const decode = decodeURIComponent(t);

    expect(decode).not.toBeNull();
    expect(decode).not.toBeUndefined();
    expect(decode).toBe(`"${template}"`);
  })
});