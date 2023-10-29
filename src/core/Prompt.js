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
   * @returns {Promise<{technology: string, submoduleName: string}>}
   */
  static prompt = async () => {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'technology',
        message: 'What technology do you want to use?',
        validate(input, _answers) {
          if (input.length === 0) {
            return 'Technology is required';
          }
          return true;
        },
        choices: [Tech.VANILLA, Tech.REACT],
      },
      {
        type: 'input',
        name: 'submoduleName',
        message: 'What is the name of your submodule?',
        validate(input, _answers) {
          if (input.length === 0) {
            return 'Submodule name is required';
          }
          if (!input.toLowerCase().includes('module')) {
            return 'Submodule name must include "module"';
          }
          return true;
        },
      },
    ]);
  };
}

export default Prompter;
