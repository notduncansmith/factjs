const {equal} = require('assert');
const {readFileSync} = require('fs');
const {runInNewContext} = require('vm');
const {evaluate} = require('./index');

const testModel = [
  {example: (_, {raw}) => raw.split('```js')[1].split('```')[0]},
  {legitExample: ({example}) => equal(true, runInNewContext(example, {evaluate}))},
];

evaluate(testModel, {}, {raw: readFileSync('./README.md', 'utf8')});
