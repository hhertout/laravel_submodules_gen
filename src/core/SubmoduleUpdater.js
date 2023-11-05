import FILES_TO_UPDATE_LIST from '../config/filesToUpdate.js';
import fs from 'fs/promises';
import Formatter from '../utils/Formatter.js';

/**
 * @class SubmoduleUpdater
 *
 * @description This class is responsible for updating files in the submodule
 */
class SubmoduleUpdater {
  /** @type {string} */
  #subModuleName;
  /** @type {Array<{filepath: string, content: string, traverse: {key: string, count: number}}>} */
  #filesToUpdate;

  constructor(submoduleName, filesToUpdate) {
    this.#subModuleName = submoduleName;
    this.#filesToUpdate = filesToUpdate ?? FILES_TO_UPDATE_LIST;
  }

  /**
   * @main
   * @method run
   * @description This method is responsible for updating files in the submodule
   * @throws {Error}
   */
  run = async () => {
    try {
      if (!this.#filesToUpdate) return;
      for (let i = 0; i < this.#filesToUpdate.length; i++) {
        const fileContent = await this._readFileToUpdate(
          this.#filesToUpdate[i].filepath
        );
        if (this.#filesToUpdate[i].traverse) {
          const contentWithVariable = this._replaceVariables(
            this.#filesToUpdate[i].content,
            this.#subModuleName
          );
          const newContent = this._traverseContent(
            fileContent,
            contentWithVariable,
            this.#filesToUpdate[i].traverse
          );
          await fs.writeFile(
            this.#filesToUpdate[i].filepath,
            newContent,
            'utf8'
          );
        } else {
          const newContent = this._getContentToAdd(
            this.#filesToUpdate[i].content,
            fileContent
          );
          const newContentWithVariables = this._replaceVariables(
            newContent,
            this.#subModuleName
          );
          await fs.writeFile(
            this.#filesToUpdate[i].filepath,
            newContentWithVariables,
            'utf8'
          );
        }
      }
    } catch (err) {
      throw err;
    }
  };

  _replaceVariables = (content, replaceValue) => {
    return content
      .replaceAll('{{subModuleName}}', replaceValue)
      .replaceAll('{{subModuleName_lw}}', replaceValue.toLowerCase())
      .replaceAll('{{subModuleName_up}}', replaceValue.toUpperCase())
      .replaceAll(
        '{{subModuleName_capitalized}}',
        Formatter.getCapitalize(replaceValue)
      )
      .replaceAll(
        '{{subModuleName_camel}}',
        Formatter.getCamelCase(replaceValue)
      );
  };

  /**
   * @method _findFileToUpdate
   * @description This method is responsible for finding the file to update
   * @throws {Error}
   */
  _readFileToUpdate = async (filePath) => {
    try {
      return fs.readFile(filePath, 'utf8');
    } catch (err) {
      throw new Error("File doesn't exist");
    }
  };

  /**
   * @method _addToFileContent
   * @description This method is responsible for adding a string to the file content
   * @param {string} stringToAdd
   * @param {string} fileContent
   */
  _getContentToAdd = (stringToAdd, fileContent) => {
    return fileContent + '\n' + stringToAdd;
  };

  /**
   * @method _traverseContent
   * @description This method is responsible for traversing the content of the file and adding a string to the file content at the targeted position
   * @param {string} content
   * @param {string} contentToAdd
   * @param {{key:string, count: number}} traverseConfig
   * @returns {string} content
   */
  _traverseContent = (content, contentToAdd, traverseConfig) => {
    let splitContent = content.split(traverseConfig.key);
    const targetedIndex = splitContent.length - 1 - traverseConfig.count;
    splitContent[targetedIndex] = splitContent[targetedIndex] + contentToAdd;
    return splitContent.join(traverseConfig.key);
  };
}

export default SubmoduleUpdater;
