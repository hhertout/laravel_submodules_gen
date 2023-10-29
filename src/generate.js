import { readdir, readFile, writeFile, unlink } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import isDirectory from './utils/isDirectory.js';

/**
 * @method generate
 * @description Origin path: src/generate.js
 * Base method for "generate" script
 * @returns {Promise<void>}
 */
const generate = async () => {
  const url = fileURLToPath(import.meta.url);
  const mainDir = dirname(url);

  const generatedDirPath = `${mainDir}/generated`;

  await unlink(`${generatedDirPath}/generated.js`);

  const directories = await readdir(`${mainDir}/templates`);
  for (let i = 0; i < directories.length; i++) {
    const dir = directories[i];
    const isDir = await isDirectory(`${mainDir}/templates/${dir}`);
    if (!isDir) continue;
    const files = await readdir(`${mainDir}/templates/${dir}`);
    for (let j = 0; j < files.length; j++) {
      const file = files[j];
      const isDir = await isDirectory(`${mainDir}/templates/${dir}/${file}`);
      if (isDir) continue;
      const content = await readFile(`${mainDir}/templates/${dir}/${file}`, 'utf8');
      const templateName = `${dir}_${file.replaceAll('.', '_')}`;

      const generatedDir = await readdir(`${mainDir}/generated`);
      if (!generatedDir.includes('generated.js')) {
        await writeFile(`${generatedDirPath}/generated.js`, '', 'utf8');
      }

      const variable = `export const ${templateName} = ${JSON.stringify(content)};`;
      const generatedContent = await readFile(`${generatedDirPath}/generated.js`, 'utf8');

      const generatedContentToWrite = generatedContent ? `${generatedContent}\n${variable}` : variable;
      await writeFile(`${generatedDirPath}/generated.js`, generatedContentToWrite, 'utf8');
    }
  }
};

await generate();

export default generate;