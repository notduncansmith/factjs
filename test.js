const {equal} = require('assert');
const {readFileSync} = require('fs');
const {runInNewContext} = require('vm');
const {evaluate} = require('./index');

// An example of when not to use models

const model = [
  {example: (_, {raw}) => raw.split('```js')[1].split('```')[0]},
  {legitExample: ({example}) => equal(true, runInNewContext(example, {evaluate}))},
];

evaluate(model, {}, {raw: readFileSync('./README.md', 'utf8')});
