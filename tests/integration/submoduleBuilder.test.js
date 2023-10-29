import SubmoduleBuilder from '../../src/core/SubmoduleBuilder.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import DESTINATION_PATH_TEST from '../data/destinationPath.js';
import { readdir } from 'fs/promises';

describe('SubModuleBuilder integration tests', () => {
  const url = fileURLToPath(import.meta.url);
  const baseDir = dirname(url);
  test('SubModuleBuilder is alive', () => {
    expect(SubmoduleBuilder).toBeTruthy();
  });
  test('SubModuleBuilder is open', async () => {
    const subModuleName = 'TestModule';
    const subModuleBuilder = new SubmoduleBuilder(subModuleName, DESTINATION_PATH_TEST);
    await subModuleBuilder.run();

    for (const [key, value] of Object.entries(DESTINATION_PATH_TEST)) {
      const dirs = await readdir(value);
      const expectedFile = key.replaceAll('_', '.');
      expect(dirs).toContain(expectedFile);
    }
  });
});