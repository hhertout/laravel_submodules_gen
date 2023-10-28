import { sleep } from './utils/sleep.js';
import { createSpinner } from 'nanospinner';
import Prompter from './core/Prompt.js';

const main = () => {
  const spinner = createSpinner('Loading...').start();
  sleep(2000).then((_) => {
    spinner.stop();
    new Prompter().prompt().then((_) => {
      spinner.success({ text: 'Done!' });
    });
  });
};

main();
