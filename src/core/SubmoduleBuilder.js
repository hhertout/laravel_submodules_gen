import { dirname, resolve } from 'path';
import DESTINATION_PATH from '../enums/destinationPath.enum.js';
import fs from 'fs/promises';
import Formatter from '../utils/Formatter.js';
import * as templates from '../../src/generated/generated.js';

/**
 * @class SubmoduleBuilder
 *
 * Build the submodule files and folders
 */
class SubmoduleBuilder {
  #subModuleName;
  #destinationPathRepository;

  /**
   *
   * @constructor
   * @param {string} subModuleName
   * @param {{[key: string]: string}} destinationPathRepository
   */
  constructor(subModuleName, destinationPathRepository = DESTINATION_PATH ) {
    this.#subModuleName = subModuleName;
    this.#destinationPathRepository = destinationPathRepository;
  }

  /**
   *
   * @method getTemplates
   * @description return all the templates from generated.js
   * @returns {{[key: string]?: string}}
   */
  getTemplates = () => {
    return templates;
  };

  /**
   *
   * @method run
   * @description run the app
   * @returns {Promise<void>}
   */
  run = async () => {
    await this.#replaceTemplateVariables();
    await Promise.all([
      this.#writeSubmoduleFiles(),
      this.#updateAndAddToFiles(),
    ]);
  };

  #writeSubmoduleFiles = async () => {
    const templates = this.getTemplates();
    for (const [key, template] of Object.entries(templates)) {
      const fileName = key.replaceAll('_', '.');
      const destPath = resolve(this.#destinationPathRepository[key], fileName);
      await fs.mkdir(dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, decodeURIComponent(template), 'utf-8');
    }
  };

  #replaceTemplateVariables = async () => {
    const templates = this.getTemplates();
    for (const [key, template] of Object.entries(templates)) {
      // todo modify with encode uri
      template.replaceAll('{{subModuleName}}', this.#subModuleName);
      template.replaceAll('{{subModuleName_lw}}', this.#subModuleName.toLowerCase());
      template.replaceAll('{{subModuleName_up}}', this.#subModuleName.toUpperCase());
      template.replaceAll('{{subModuleName_capitalized}}', Formatter.getCapitalize(this.#subModuleName));
      template.replaceAll('{{subModuleName_camel}}', Formatter.getCamelCase(this.#subModuleName));
    }
  };

  #updateAndAddToFiles = async () => {

  };
}

export default SubmoduleBuilder;