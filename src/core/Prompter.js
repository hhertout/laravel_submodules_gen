import inquirer from 'inquirer';
import Tech from '../enums/tech.enum.js';

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
        message: "What's the name of your submodule? (in camelCase)",
        validate(input, _answers) {
          if (input.length === 0) {
            return 'Submodule name is required';
          }
          if (!input.toLowerCase().includes('module')) {
            return 'Submodule name must include "Module"';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'framework',
        message: 'What technology do you want to use? (default: Vanilla JS)',
        default: Tech.VANILLA,
        validate(input, _answers) {
          if (input.length === 0) {
            return 'Technology is required';
          }
          return true;
        },
        choices: Object.values(Tech),
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
        message: 'Do you want to install dependencies? (default: NO)',
        default: false,
      },
    ]);
  };
}

export default Prompter;
