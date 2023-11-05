import SubmoduleUpdater from '../../src/core/SubmoduleUpdater.js';
import EDIT_CONFIG_TEST from '../data/editConfig.js';
import fs from 'fs/promises';
import Formatter from '../../src/utils/Formatter.js';

describe('submoduleUpdater tests', () => {
  beforeAll(async () => {
    // Delete all files in EDIT_CONFIG_TEST and replace it by route.php file
    for (const files of EDIT_CONFIG_TEST) {
      await fs.unlink(files.filepath);
      await fs.writeFile(files.filepath, files.baseContent, 'utf8');
    }
  });
  test('should exist ok', () => {
    expect(SubmoduleUpdater).not.toBeUndefined();
  });

  test('_getContentToAdd function test ok', () => {
    const submoduleUpdater = new SubmoduleUpdater('test', EDIT_CONFIG_TEST);
    const result = submoduleUpdater._getContentToAdd('test', 'test');
    expect(result).toBe('test' + '\n' + 'test');
  });
  test('_readFileToUpdate function test ok', async () => {
    const submoduleUpdater = new SubmoduleUpdater(
      'TestModule',
      EDIT_CONFIG_TEST
    );
    for (const files of EDIT_CONFIG_TEST) {
      const result = await submoduleUpdater._readFileToUpdate(files.filepath);
      expect(result).toBe(files.baseContent);
    }
  });
  test('test replace template variables', async () => {
    const subModuleName = 'testModule';
    const submoduleUpdater = new SubmoduleUpdater(
      subModuleName,
      EDIT_CONFIG_TEST
    );
    const res1 = await submoduleUpdater._replaceVariables(
      '{{subModuleName}}',
      subModuleName
    );
    expect(res1).toBe(subModuleName);
    const res2 = await submoduleUpdater._replaceVariables(
      '{{subModuleName_lw}}',
      subModuleName
    );
    expect(res2).toBe(subModuleName.toLowerCase());
    const res3 = await submoduleUpdater._replaceVariables(
      '{{subModuleName_up}}',
      subModuleName
    );
    expect(res3).toBe(subModuleName.toUpperCase());
    const res4 = await submoduleUpdater._replaceVariables(
      '{{subModuleName_capitalized}}',
      subModuleName
    );
    expect(res4).toBe(Formatter.getCapitalize(subModuleName));
    const res5 = await submoduleUpdater._replaceVariables(
      '{{subModuleName_camel}}',
      subModuleName
    );
    expect(res5).toBe(Formatter.getCamelCase(subModuleName));

    const res6 = await submoduleUpdater._replaceVariables(
      '{{subModuleName_up}}{{subModuleName_camel}}',
      subModuleName
    );
    expect(res6).toBe(
      subModuleName.toUpperCase() + Formatter.getCamelCase(subModuleName)
    );
  });
  test('run function test ok', async () => {
    const subModuleName = 'testModule';
    const submoduleUpdater = new SubmoduleUpdater(
      subModuleName,
      EDIT_CONFIG_TEST
    );
    await submoduleUpdater.run();
    for (const files of EDIT_CONFIG_TEST) {
      const result = await submoduleUpdater._readFileToUpdate(files.filepath);
      const expected = files.content
        .replaceAll('{{subModuleName_lw}}', subModuleName.toLowerCase())
        .replaceAll(
          '{{subModuleName_capitalized}}',
          Formatter.getCapitalize(subModuleName)
        );
      if (files.traverse) {
        const expectedTraverse = submoduleUpdater._traverseContent(
          files.baseContent,
          expected,
          files.traverse
        );
        expect(result).toBe(expectedTraverse);
      } else {
        expect(result).toBe(files.baseContent + '\n' + expected);
      }
    }
  });
  test('traverse function test ok', async () => {
    const subModuleName = 'testModule';
    const submoduleUpdater = new SubmoduleUpdater(
      subModuleName,
      EDIT_CONFIG_TEST
    );
    const base =
      "<?php\nRoute::prefix('admin')->group(function () {Route::get('/users', function () {\n});\n});";
    const expected =
      "<?php\nRoute::prefix('admin')->group(function () {Route::get('/users', function () {\nRoute::get('/test', 'TestController@index');\n});\n});";
    const res = submoduleUpdater._traverseContent(
      base,
      "Route::get('/test', 'TestController@index');\n",
      {
        key: '}',
        count: 2,
      }
    );
    expect(res).toBe(expected);
  });
});
