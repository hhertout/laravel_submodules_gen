import Tech from '../enums/tech.enum.js';
import Path from '../enums/path.enum.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readdir } from 'fs/promises';

class TemplateGenerator {
  #modulePath;
  #templatePath;

  constructor() {
    const url = fileURLToPath(import.meta.url);
    this.#modulePath = dirname(url);
    this.#templatePath = '/templates';
  }

  generateTemplate(templateType) {
    readdir(`${this.#modulePath}${this.#templatePath}`).then(directories => {
      directories.forEach(dir => {
        //readdir(``)
      });
    });
  }

  get modulePath() {
    return this.#modulePath;
  }
}

export default TemplateGenerator;
