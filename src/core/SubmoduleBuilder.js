import { dirname, resolve } from 'path';
import DESTINATION_PATH from '../config/destinationPath.config.js';
import fs from 'fs/promises';
import Formatter from '../utils/Formatter.js';
import * as templates from '../../src/generated/generated.js';
import TECHNOLOGIES from '../config/technologies.config.js';

/**
 * @class SubmoduleBuilder
 *
 * @description Build the submodule files and folders
 */
class SubmoduleBuilder {
  /** @type {string} */
  #subModuleName;
  /** @type {string} */
  #technologyChoice;
  /** @type {Record<string, string>} */
  #destinationPathRepository;
  /** @type {Record<string, string> | null} */
  #formattedTemplates;

  /**
   *
   * @constructor
   * @param {string} subModuleName
   * @param {string} technologyChoice
   * @param {Record<string, string>} destinationPathRepository
   */
  constructor(
    subModuleName,
    technologyChoice,
    destinationPathRepository = DESTINATION_PATH
  ) {
    this.#subModuleName = subModuleName;
    this.#technologyChoice = technologyChoice;
    this.#destinationPathRepository = destinationPathRepository;
    this.#formattedTemplates = null;
  }

  /**
   *
   * Caution - Object values are readonly !
   * @method getTemplates
   * @description Return all the templates from generated.js as module object
   * @returns {Partial<Record<string, string>>}
   */
  getTemplates = () => {
    return templates;
  };

  /**
   *
   * @method run
   * @description run$$ the app
   * @returns {Promise<void>}
   * @throws {Error}
   */
  run = async () => {
    try {
      await this.#buildTemplateVariable();
      await this.#writeSubmoduleFiles();
    } catch (err) {
      throw new Error(`Error during the build process: ${err.message}`);
    }
  };

  /**
   * @private
   * @method #writeSubmoduleFiles
   * @description Write the submodule files to the destination path
   * @returns {Promise<void>}
   * @throws {Error}
   */
  #writeSubmoduleFiles = async () => {
    if (
      !this.#formattedTemplates ||
      Object.keys(this.#formattedTemplates).length === 0
    ) {
      throw new Error('Templates not found');
    }
    try {
      for (const [key, template] of Object.entries(this.#formattedTemplates)) {
        if (!this.#destinationPathRepository[key]) {
          console.warn(`Destination path not found for ${key}`);
          continue;
        }
        if (!this._isChosenTechnology(key)) continue;
        let fileName = key.replaceAll('_', '.');
        Object.values(TECHNOLOGIES).forEach((technology) => {
          const pattern = new RegExp(`${technology}.`, 'gi');
          fileName = fileName.replaceAll(pattern, '');
        });
        const destinationFileName = this.#relevantFileProcess(fileName);
        const destinationPath = resolve(
          this.#destinationPathRepository[key],
          destinationFileName
        );
        await fs.mkdir(dirname(destinationPath), { recursive: true });
        await fs.writeFile(
          destinationPath,
          decodeURIComponent(template),
          'utf-8'
        );
      }
    } catch (err) {
      throw err;
    }
  };

  /**
   * @private
   * @method #specificFileNameCase
   * @description Found exceptions for specific file names
   * @param fileName
   * @returns {string}
   */
  #relevantFileProcess = (fileName) => {
    switch (fileName) {
      case 'index.js': {
        fileName = this._buildIndexFilename(fileName);
        break;
      }
      case 'controller.php': {
        fileName = this._buildControllerFilename(fileName);
        break;
      }
      case 'view.blade.php': {
        fileName = this._buildViewFilename(fileName);
        break;
      }
    }
    return fileName;
  };

  /**
   * @method #buildIndex
   * @description Build the index file - replace the index with the submodule name
   * @param fileName
   * @returns {string}
   */
  _buildIndexFilename = (fileName) => {
    const name = this.#subModuleName.split(/module/i).join('');
    return fileName.replaceAll('index', `${name.toLowerCase()}.module`);
  };

  /**
   * @method #buildController
   * @description Build the controller file - replace the controller with the submodule name
   * @param fileName
   * @returns {string}
   */
  _buildControllerFilename = (fileName) => {
    const name = this.#subModuleName.split(/module/i).join('');
    const controllerName = name.charAt(0).toUpperCase() + name.slice(1);
    return fileName.replaceAll('controller', `${controllerName}Controller`);
  };

  /**
   * @method _buildViewFilename
   * @description Build the view file - replace the view with the submodule name
   * @param fileName
   * @returns {string}
   */
  _buildViewFilename = (fileName) => {
    const name = this.#subModuleName.split(/module/i).join('');
    const viewName = name.toLowerCase();
    return fileName.replaceAll('view', `${viewName}`);
  };

  /**
   * @method _isChosenTechnology
   * @param {string} technology
   * @returns {boolean}
   */
  _isChosenTechnology = (technology) => {
    return technology
      .toLowerCase()
      .includes(this.#technologyChoice.toLowerCase());
  };

  /**
   * @method #buildTemplateVariable
   * @description Replace the template variables with the submodule name
   * @returns {Promise<void>}
   * @throws {Error}
   */
  #buildTemplateVariable = async () => {
    try {
      const templates = this.getTemplates();
      const formattedTemplates = {};
      for (let [key, template] of Object.entries(templates)) {
        let fmt = template;
        fmt = fmt.replaceAll(
          encodeURIComponent('{{subModuleName}}'),
          encodeURIComponent(this.#subModuleName)
        );
        fmt = fmt.replaceAll(
          encodeURIComponent('{{subModuleName_lw}}'),
          encodeURIComponent(this.#subModuleName.toLowerCase())
        );
        fmt = fmt.replaceAll(
          encodeURIComponent('{{subModuleName_up}}'),
          encodeURIComponent(this.#subModuleName.toUpperCase())
        );
        fmt = fmt.replaceAll(
          encodeURIComponent('{{subModuleName_capitalized}}'),
          encodeURIComponent(Formatter.getCapitalize(this.#subModuleName))
        );
        fmt = fmt.replaceAll(
          encodeURIComponent('{{subModuleName_camel}}'),
          encodeURIComponent(Formatter.getCamelCase(this.#subModuleName))
        );
        formattedTemplates[key] = fmt;
      }
      this.#formattedTemplates = formattedTemplates;
    } catch (err) {
      throw err;
    }
  };
}

export default SubmoduleBuilder;
