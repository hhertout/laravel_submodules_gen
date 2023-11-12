import inquirer from 'inquirer';
import TechnologiesConfig from '../config/technologies.config.js';

/**
 *  @class Prompter
 *
 *  Class to prompt the user for the technology and the name of the submodule
 */
class Prompter {
  /**
   * @method prompt
   *
   * @returns {Promise<{framework: string, submoduleName: string}>}
   */
  static prompt = async () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'submoduleName',
        message: "What's the name of your submodule? (PascalCase)",
        validate(input, _answers) {
          if (input.length === 0) {
            return 'Submodule name is required';
          }
          if (!input.match(/Module$/i)) {
            return 'Submodule name must include "Module"';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'framework',
        message: 'What technology do you want to use? (default: Vanilla JS)',
        default: TechnologiesConfig.VANILLA,
        validate(input, _answers) {
          if (input.length === 0) {
            return 'Technology is required';
          }
          return true;
        },
        choices: Object.values(TechnologiesConfig),
      },
    ]);
  };

  /**
   * @method withTechnologyChoicePrompt
   * @description Prompt the user if the technology choice is not Vanilla JS
   * @returns {Promise<{dependenciesInstallation: boolean}>}}
   */
  static withTechnologyChoicePrompt = () => {
    return inquirer.prompt([
      {
        type: 'confirm',
        name: 'dependenciesInstallation',
        message: 'Do you want to install$ dependencies? (default: NO)',
        default: false,
      },
    ]);
  };
}

export default Prompter;
