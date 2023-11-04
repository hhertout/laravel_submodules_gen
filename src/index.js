#!/usr/bin/env node

import sleep from './utils/sleep.js';
import { createSpinner } from 'nanospinner';
import Prompter from './core/Prompter.js';
import Tech from './enums/tech.enum.js';
import Guard from './utils/Guard.js';

/**
 *
 * @method main
 * @description Origin path: src/index.js
 * @returns {Promise<void>}
 */
const main = async () => {
  const spinner = createSpinner('Starting...').start();
  await sleep(1000);
  spinner.stop();
  try {
    const answers = await Prompter.prompt();
    if (answers.framework !== Tech.VANILLA) {
      const techAnswers = await Prompter.withTechnologyChoicePrompt();
      answers.dependenciesInstallation = techAnswers.dependenciesInstallation;
    }
    console.log(answers);
    const err = Guard.checkAnswers(answers);
    if (err) {
      spinner.stop();
      spinner.error({ text: 'Submodule not installed!' });
      spinner.error({
        text: 'Your request contain errors. Please check it and try again',
      });
      return;
    }
    if (answers.dependenciesInstallation) {
      spinner.start({ text: 'Installing dependencies...' });
      await sleep(1000);
      spinner.success({ text: 'Dependencies installed!' });
    }

    spinner.start({ text: 'Creating submodule...' });
    await sleep(1000);
    spinner.success({ text: 'Submodule created!' });
  } catch (err) {
    spinner.error({ text: err.message });
  }
};

main();
