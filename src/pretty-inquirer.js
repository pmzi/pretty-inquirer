const inquirer = require('inquirer');
const chainFiller = require('chain-filler');

export const opts = chainFiller(
  [
    'type',
    'name',
    'message',
    'default',
    'choices',
    'validate',
    'filter',
    'transformer',
    'when',
    'pageSize',
    'prefix',
    'suffix',
    'askAnswered',
  ],
);

export const createQuestions = function createQuestions(questions) {
  const observableQuestions = {};
  Object.keys(questions).forEach((question) => {
    (() => {
      let answer;
      Object.defineProperty(observableQuestions, question, {
        enumerable: true,
        get() {
          const options = {
            name: question,
            ...questions[question].get(),
          };
          if (answer && !options.askAnswered) return answer;
          return inquirer
            .prompt([
              options,
            ]).then((ans) => {
              answer = ans[options.name];
              return answer;
            });
        },
      });
    })();
  });

  return observableQuestions;
};
