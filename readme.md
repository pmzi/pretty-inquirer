# Pretty Inquirer

This package is on top of `inquirer` and makes it easy to use `inquirer`.

## Usage

```javascript
const { createQuestions, opts } = require('pretty-inquirer');

const props = createQuestions({
  name: opts.message('What is the name?').type('input').default('Maryam'),
  skills: opts.message('What is your skills?').type('list').choices(['js', 'html', 'css']).default(0),
  single: opts.message('Are you single?').type('confirm').default(true),
});

(async()=>{
  if(await props.single) {
    console.log(`${await props.name}, will you marry me?`);
  }else{
    console.log(`We can work together using ${await this.skills}.`);
  }
})()

```
Pretty inquirer gets user input as you use the props. For example, if the user answers `Are you single?` with yes, we only get his/her name after that and will never ask about his/her skills. Otherwise, we ask about his/her skills and never ask about his/her name.

If you use a prop multiple times, the question will be asked only once and will be cached. In the example below, name will be asked only once:

```javascript
const { createQuestions, opts } = require('pretty-inquirer');

const props = createQuestions({
  name: opts.message('What is the name?').type('input').default('Maryam'),
});

(async()=>{
  if(await props.name === 'Maryam') {
    console.log(`Hello ${await props.name}, how are you?`);
  }else{
    console.log(`${await props.name} I don't know you.`);
  }
})()
```

If you want to ask name every time you can use `askAnswered` option:

```javascript
const { createQuestions, opts } = require('pretty-inquirer');

const props = createQuestions({
  name: opts.message('What is the name?').type('input').default('Maryam').askAnswered(true),
});

(async()=>{
  if(await props.name === 'Maryam') {
    console.log(`Hello ${await props.name}, how are you?`);
  }else{
    console.log(`${await props.name} I don't know you.`);
  }
})()
```

Which force `pretty-inquirer` to ask the same question every time.
