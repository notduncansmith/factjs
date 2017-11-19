# Fact.js

Fact.js is a code orchestration library that makes it easier to write maintainable Javascript. It is a straightforward port of the [Factfold Clojure library](https://github.com/notduncansmith/factfold).

```
npm install factjs
```

## How does it work

From the Factfold README:

> Factfold processes data by applying **models** to **facts**† in chronological order. Models associate **property** names with functions to compute their values. Grouping model properties into **orders** makes their logical dependencies clear to human readers, and provides a natural concurrency barrier. Each property's value is computed from a snapshot of the current state and a new datum.
>
> † Feel free to substitute "applying models to facts" with "calculating views of documents", "dispatching messages to actors/objects/processes", "executing instructions on a thread", "handling events in a queue", "updating relations with records", etc.

In the reference implementation, the state object (like most Clojure data structures) employs structural sharing, allowing cheap immutable copies while code performs "mutations" and the runtime stores only the differences. This implementation does not make any such affordances, though of course if you like immutability there are libraries like [mori](https://github.com/swannodette/mori) (which implements ClojureScript's persistent data structures) and [Immutable.js](https://facebook.github.io/immutable-js/).

## Usage

Fact.js exports a single function, `evaluate`. This function takes the model, the current model state, and the new datum as arguments.

```js
const helloModel = [
  {greeting: (s, f) => (f.subject ? `Hello, ${f.subject}!` : s.greeting)},
];

evaluate(helloModel, {}, {subject: 'world'}).greeting == "Hello, world!"
```

The current implementation is not concurrent, since there are a number of evaluation strategies available and the right one changes depending on context. As implementations of these become available, they can be standardized and assimilated.

## License

Licensed under the Eclipse Public License version 1.0.

Copyright Duncan Smith 2017
