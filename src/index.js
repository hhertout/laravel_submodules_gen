#!/usr/bin/env node

import sleep from './utils/sleep.js';
import { createSpinner } from 'nanospinner';
import Prompter from './core/Prompt.js';

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
    spinner.success({ text: 'Done!' });
  } catch (err) {
    spinner.error({ text: err.message });
  }
};

main();
