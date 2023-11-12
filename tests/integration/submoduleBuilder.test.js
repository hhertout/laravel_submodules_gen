import SubmoduleBuilder from '../../src/core/SubmoduleBuilder.js';
import DESTINATION_PATH_TEST from '../data/destinationPath.js';
import { readdir } from 'fs/promises';
import TECHNOLOGIES from '../../src/config/technologies.config.js';

const dist_path = 'tests/integration/dist';
describe('SubModuleBuilder integration tests', () => {
  test('SubModuleBuilder is alive', () => {
    expect(SubmoduleBuilder).toBeTruthy();
  });
  test('SubModuleBuilder work', async () => {
    let subModuleName = 'TestModule';
    const techChoice = 'Vanilla';
    const subModuleBuilder = new SubmoduleBuilder(
      subModuleName,
      techChoice,
      DESTINATION_PATH_TEST
    );
    await subModuleBuilder.run();
    const dirs = await readdir(dist_path);
    for (const destPath in DESTINATION_PATH_TEST) {
      let expected = destPath.replaceAll('_', '.');
      if (
        !expected.includes('controller') &&
        !expected.includes('index') &&
        !expected.includes('view')
      ) {
        Object.values(TECHNOLOGIES).forEach((technology) => {
          const pattern = new RegExp(`${technology}.`, 'gi');
          expected = expected.replaceAll(pattern, '');
        });
        expect(dirs).toContain(expected);
      }
    }
  });
});

/**
 *
 * Tests for relevant submodule name
 *
 */
describe('Submodule builder with different submodule name', () => {
  const subModuleName = 'testModule';
  const techChoice = 'Vanilla';
  const subModuleBuilder = new SubmoduleBuilder(
    subModuleName,
    techChoice,
    DESTINATION_PATH_TEST
  );
  const name = subModuleName.split(/module/i).join('');
  test('test with different submodule name => index.js', async () => {
    await subModuleBuilder.run();
    const moduleFileName = name.toLowerCase();
    const expectedFile = `${moduleFileName}.module.js`;
    const dirs = await readdir(dist_path);
    expect(dirs).toContain(expectedFile);
  });
  test('test with different submodule name => controller php', async () => {
    await subModuleBuilder.run();
    const controllerFileName = name.charAt(0).toUpperCase() + name.slice(1);
    const expectedFile = `${controllerFileName}Controller.php`;
    const dirs = await readdir(dist_path);

    expect(dirs).toContain(expectedFile);
  });
  test('test with different submodule name => view blade php', async () => {
    await subModuleBuilder.run();
    const expectedFile = `${name.toLowerCase()}.blade.php`;
    const dirs = await readdir(dist_path);

    expect(dirs).toContain(expectedFile);
  });
});
