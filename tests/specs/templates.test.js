import * as templates from '../../src/generated/generated.js';

describe('getTemplateTest', () => {
  test('getTemplateTest', () => {
    for (const [key, template] of Object.entries(templates)) {
      expect(template).toBeDefined();
      expect(key).toBeDefined();
    }
  });
});