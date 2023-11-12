import SubmoduleBuilder from '../../src/core/SubmoduleBuilder.js';

describe('Builder class tests', () => {
  test('builder class exists', () => {
    expect(SubmoduleBuilder).toBeDefined();
  });

  test('builder replace index name', () => {
    const submoduleBuilder = new SubmoduleBuilder('testModule');
    const test = 'index.js';
    const expected = 'test.module.js';
    const result = submoduleBuilder._buildIndexFilename(test);
    expect(result).toEqual(expected);
  });

  test('builder replace controller name', () => {
    const submoduleBuilder = new SubmoduleBuilder('testModule');
    const test = 'controller.js';
    const expected = 'TestController.js';
    const result = submoduleBuilder._buildControllerFilename(test);
    expect(result).toEqual(expected);
  });

  test('builder replace view name', () => {
    const submoduleBuilder = new SubmoduleBuilder('testModule');
    const test = 'view.blade.php';
    const expected = 'test.blade.php';
    const result = submoduleBuilder._buildViewFilename(test);
    expect(result).toEqual(expected);
  });
});
