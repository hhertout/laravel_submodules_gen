import SubmoduleBuilder from '../../src/core/SubmoduleBuilder.js';
import DESTINATION_PATH_TEST from '../data/destinationPath.js';
import { readdir } from 'fs/promises';

describe('SubModuleBuilder integration tests', () => {
  test('SubModuleBuilder is alive', () => {
    expect(SubmoduleBuilder).toBeTruthy();
  });
  test('SubModuleBuilder is open', async () => {
    let subModuleName = 'TestModule';
    const subModuleBuilder = new SubmoduleBuilder(
      subModuleName,
      DESTINATION_PATH_TEST
    );
    await subModuleBuilder.run();

    for (const [key, value] of Object.entries(DESTINATION_PATH_TEST)) {
      const dirs = await readdir(value);
      const expectedFile = key.replaceAll('_', '.');
      expect(dirs).toContain(expectedFile);
    }
  });
});

describe('Submodule builder with different submodule name', () => {
  /**
   * Test with different submodule name
   */
  test('test with different submodule name', async () => {
    const subModuleName = 'testModule';
    const subModuleBuilder = new SubmoduleBuilder(
      subModuleName,
      DESTINATION_PATH_TEST
    );
    await subModuleBuilder.run();

    for (const [key, value] of Object.entries(DESTINATION_PATH_TEST)) {
      const dirs = await readdir(value);
      const expectedFile = key.replaceAll('_', '.');
      expect(dirs).toContain(expectedFile);
    }
  });
  test('test with different submodule name', async () => {
    const subModuleName = 'testmodule';
    const subModuleBuilder = new SubmoduleBuilder(
      subModuleName,
      DESTINATION_PATH_TEST
    );
    await subModuleBuilder.run();

    for (const [key, value] of Object.entries(DESTINATION_PATH_TEST)) {
      const dirs = await readdir(value);
      const expectedFile = key.replaceAll('_', '.');
      expect(dirs).toContain(expectedFile);
    }
  });
});
