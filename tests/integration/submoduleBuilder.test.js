import SubmoduleBuilder from '../../src/core/SubmoduleBuilder.js';
import DESTINATION_PATH_TEST from '../data/destinationPath.js';
import { readdir } from 'fs/promises';
import TECHNOLOGIES from '../../src/config/technologies.config.js';

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
      let expectedFile = key.replaceAll('_', '.');
      Object.values(TECHNOLOGIES).forEach((technology) => {
        const pattern = new RegExp(`${technology.toLowerCase()}.`, 'gi');
        expectedFile = expectedFile.replaceAll(pattern, '');
      });
      if (!expectedFile.includes('index')) {
        expect(dirs).toContain(expectedFile.toLowerCase());
      } else {
        const name = subModuleName.split(/module/i).join('');
        expect(dirs).toContain(`${name.toLowerCase()}.module.js`);
      }
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
      let expectedFile = key.replaceAll('_', '.');
      Object.values(TECHNOLOGIES).forEach((technology) => {
        const pattern = new RegExp(`${technology.toLowerCase()}.`, 'gi');
        expectedFile = expectedFile.replaceAll(pattern, '');
      });
      if (!expectedFile.includes('index')) {
        expect(dirs).toContain(expectedFile.toLowerCase());
      } else {
        const name = subModuleName.split(/module/i).join('');
        expect(dirs).toContain(`${name}.module.js`);
      }
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
      let expectedFile = key.replaceAll('_', '.');
      Object.values(TECHNOLOGIES).forEach((technology) => {
        const pattern = new RegExp(`${technology.toLowerCase()}.`, 'gi');
        expectedFile = expectedFile.replaceAll(pattern, '');
      });
      if (!expectedFile.includes('index')) {
        expect(dirs).toContain(expectedFile.toLowerCase());
      } else {
        const name = subModuleName.split(/module/i).join('');
        expect(dirs).toContain(`${name}.module.js`);
      }
    }
  });
});
