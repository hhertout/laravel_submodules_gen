import TechnologiesConfig from '../config/technologies.config.js';

/**
 * @class Guard
 *
 * @description Guard class for checking values
 */
class Guard {
  constructor() {}

  /**
   * @static
   * @method checkAnswers
   * @description Check the answers from the user
   * @param {{framework: string, submoduleName: string, dependenciesInstallation?: boolean}} answers
   */
  static checkAnswers = (answers) => {
    if (!answers.framework) {
      return false;
    }
    if (!answers.submoduleName) {
      return false;
    }
    if (
      answers.framework !== TechnologiesConfig.VANILLA &&
      !answers.dependenciesInstallation
    ) {
      return false;
    }
    return true;
  };

  static techIsEmpty = () => {
    return Object.keys(TechnologiesConfig).length > 0;
  };
  static destinationPathIsEmpty = () => {
    return Object.keys(TechnologiesConfig).length > 0;
  };
}

export default Guard;
