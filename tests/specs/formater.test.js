import Formatter from '../../src/utils/Formatter.js';

describe('Format class tests', () => {
  test('format class exists', () => {
    expect(Formatter).toBeDefined();
  });
  test('format class has getCapitalize method', () => {
    expect(Formatter.getCapitalize).toBeDefined();
    const test = 'testModule';
    const expected = 'TestModule';
    const result = Formatter.getCapitalize(test);
    expect(result).toEqual(expected);

    const test2 = 'testmodule';
    const expected2 = 'TestModule';
    const result2 = Formatter.getCapitalize(test2);
    expect(result2).toEqual(expected2);
  });
  test('format class has decapitalize method', () => {
    expect(Formatter.decapitalize).toBeDefined();
    const test = 'Test';
    const expected = 'test';
    const result = Formatter.decapitalize(test);
    expect(result).toEqual(expected);
  });
  test('format class has getCamelCase method', () => {
    expect(Formatter.getCamelCase).toBeDefined();
    const test = 'testmodule';
    const expected = 'testModule';
    const result = Formatter.getCamelCase(test);
    expect(result).toEqual(expected);
  });
  test('format class has getCamelCase method && test on complex module name', () => {
    expect(Formatter.getCamelCase).toBeDefined();
    const test = 'MeshModelModule';
    const expected = 'meshModelModule';
    const result = Formatter.getCamelCase(test);
    expect(result).toEqual(expected);
  });
});