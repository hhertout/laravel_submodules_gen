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
  #formattedTemplates;

  /**
   *
   * @constructor
   * @param {string} subModuleName
   * @param {{[key: string]: string}} destinationPathRepository
   */
  constructor(subModuleName, destinationPathRepository = DESTINATION_PATH) {
    this.#subModuleName = subModuleName;
    this.#destinationPathRepository = destinationPathRepository;
    this.#formattedTemplates = null;
  }

  /**
   *
   * Caution - Object values are readonly !
   * @method getTemplates
   * @description Return all the templates from generated.js as module object
   * @returns {{[variable: string]: string}}
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
    const templates = this.#formattedTemplates;
    for (const [key, template] of Object.entries(templates)) {
      const fileName = key.replaceAll('_', '.');
      const destPath = resolve(this.#destinationPathRepository[key], fileName);
      await fs.mkdir(dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, decodeURIComponent(template), 'utf-8');
    }
  };

  #replaceTemplateVariables = async () => {
    const templates = this.getTemplates();
    const formattedTemplates = {};
    for (let [key, template] of Object.entries(templates)) {
      let fmt = template;
      fmt = fmt.replaceAll(encodeURIComponent('{{subModuleName}}'), encodeURIComponent(this.#subModuleName));
      fmt = fmt.replaceAll(encodeURIComponent('{{subModuleName_lw}}'), encodeURIComponent(this.#subModuleName.toLowerCase()));
      fmt = fmt.replaceAll(encodeURIComponent('{{subModuleName_up}}'), encodeURIComponent(this.#subModuleName.toUpperCase()));
      fmt = fmt.replaceAll(encodeURIComponent('{{subModuleName_capitalized}}'), encodeURIComponent(Formatter.getCapitalize(this.#subModuleName)));
      fmt = fmt.replaceAll(encodeURIComponent('{{subModuleName_camel}}'), encodeURIComponent(Formatter.getCamelCase(this.#subModuleName)));

      formattedTemplates[key] = fmt;
    }

    this.#formattedTemplates = formattedTemplates;
  };

  #updateAndAddToFiles = async () => {

  };
}

export default SubmoduleBuilder;