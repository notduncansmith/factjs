module.exports = {evaluate};

function evaluate(model, state, fact) {
  return model.reduce((orderVals, props) => {
    return Object.keys(props).reduce((vals, key) => {
      if (props[key].slice) {
        return evaluate(props[key], orderVals[key], fact);
      }

      vals[key] = props[key].call(orderVals[key], orderVals, fact);

      return vals;
    }, orderVals);
  }, state);
}
