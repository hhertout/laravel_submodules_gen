import inquirer from "inquirer";
import Tech from "../enums/tech.enum.js";

class Prompter {
    /**
     * Can throw error if validation fails
     *
     * @returns {Promise<{technology: string, submoduleName: string}>}
     */
    static prompt = async () => {
        const result = await inquirer.prompt([
            {
                type: 'list',
                name: 'technology',
                message: 'What technology do you want to use?',
                choices: [Tech.VANILLA, Tech.REACT],
            },
            {
                type: 'input',
                name: 'submoduleName',
                message: 'What is the name of your submodule?',
            },
        ]);
        this.#validatePromptValues(result);
    };
    /**
     * @private
     *
     * Validate prompt value
     *
     * @param {{technology: any, submoduleName: string}} result
     */
    static #validatePromptValues = (result) => {
        if (!result.submoduleName) {
            throw new Error('Submodule name is required');
        }
        if (!result.technology) {
            throw new Error('Technology is required');
        }
        if (!Object.values(Tech).includes(result.technology)) {
            throw new Error('Invalid technology');
        }
    };
}

export default Prompter;
