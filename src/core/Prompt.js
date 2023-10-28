import inquirer from "inquirer";
import Tech from "../enums/tech.enum.js";

class Prompter {
  constructor() {}

  prompt = async () => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'technology',
        message: 'What technology do you want to use?',
        choices: [Tech.VANILLA, Tech.REACT],
      },
      {
        type: 'input',
        name: 'snpx ubmoduleName',
        message: 'What is the name of your submodule?',
      },
    ]);
    console.log(answers);
    return {};
  };
}

export default Prompter;
