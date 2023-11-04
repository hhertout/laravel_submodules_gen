#!/usr/bin/env node

import sleep from './utils/sleep.js';
import { createSpinner } from 'nanospinner';
import Prompter from './core/Prompter.js';
import Tech from './config/tech.js';
import Guard from './utils/Guard.js';

/**
 *
 * @method main
 * @description Origin path: src/index.js
 * @returns {Promise<void>}
 */
const main = async () => {
  const spinner = createSpinner('Starting...').start();
  if (!Guard.techIsEmpty() && !Guard.destinationPathIsEmpty()) {
    throw new Error(
      'Tech object or destination path object is empty, cannot proceed'
    );
  }
  await sleep(1000);
  spinner.success({ text: 'Started!' });
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
    spinner.success({ text: 'Submodule successfully created!' });
  } catch (err) {
    spinner.error({ text: err.message });
  }
};

main();
