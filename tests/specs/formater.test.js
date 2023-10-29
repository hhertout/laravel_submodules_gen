import Formatter from '../../src/utils/Formatter.js';

describe('Format class tests', () => {
  test('format class exists', () => {
    expect(Formatter).toBeDefined();
  });
  test('format class has getCapitalize method', () => {
    expect(Formatter.getCapitalize).toBeDefined();
    const test = 'test';
    const expected = 'Test';
    const result = Formatter.getCapitalize(test);
    expect(result).toEqual(expected);
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