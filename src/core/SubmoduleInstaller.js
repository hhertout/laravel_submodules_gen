import TechnologiesConfig from '../config/technologies.config.js';
import { exec } from 'child_process';
import DependenciesConfig from '../config/dependencies.config.js';

/**
 * @class SubmoduleInstaller
 *
 * @description Class to install dependencies of the submodule
 */
class SubmoduleInstaller {
  #technologyChoice;

  constructor(technologyChoice) {
    this.#technologyChoice = technologyChoice;
  }

  /**
   * @method install
   *
   * @description Install dependencies of the submodule
   */
  install = () => {
    switch (this.#technologyChoice) {
      case TechnologiesConfig.REACT:
        exec(`npm install ${DependenciesConfig.REACT.join(' ')}`);
        break;
      case TechnologiesConfig.SOLID:
        exec(`npm install ${DependenciesConfig.SOLID.join(' ')}`);
        break;
      default:
        throw new Error('Technology not supported');
    }
  };
}

export default SubmoduleInstaller;
