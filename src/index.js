#!/usr/bin/env node

import sleep from './utils/sleep.js';
import { createSpinner } from 'nanospinner';
import Prompter from './core/Prompter.js';
import TechnologiesConfig from './config/technologies.config.js';
import Guard from './utils/Guard.js';
import SubmoduleInstaller from './core/SubmoduleInstaller.js';

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
    if (answers.framework !== TechnologiesConfig.VANILLA) {
      const techAnswers = await Prompter.withTechnologyChoicePrompt();
      answers.dependenciesInstallation = techAnswers.dependenciesInstallation;
    }
    if (!Guard.checkAnswers(answers)) {
      spinner.stop();
      spinner.error({ text: 'Submodule not installed!' });
      spinner.error({
        text: 'Your request contain errors. Please check it and try again',
      });
      return;
    }
    spinner.start({ text: 'Creating submodule...' });
    await sleep(1000);
    spinner.success({ text: 'Submodule successfully created!' });

    if (answers.dependenciesInstallation) {
      spinner.start({ text: 'Installing dependencies...' });
      await sleep(1000);
      const installer = new SubmoduleInstaller(answers.framework);
      try {
        installer.install();
      } catch (err) {
        spinner.error({ text: 'Failed to install$ dependency' + err.message });
      }
      spinner.success({ text: 'Dependencies installed!' });
    }
  } catch (err) {
    spinner.error({ text: err.message });
  }
};

main();
