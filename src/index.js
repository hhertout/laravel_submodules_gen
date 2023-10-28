import { sleep } from './utils/sleep.js';
import { createSpinner } from 'nanospinner';
import Prompter from './core/Prompt.js';

const main = () => {
  const spinner = createSpinner('Starting...').start();
  sleep(1000).then((_) => {
    spinner.stop();
    Prompter.prompt().then((answers) => {
      spinner.success({ text: 'Done!' });
      return answers;
    }).catch(err => {
        spinner.error({ text: err.message });
    });
  });
};

main();
