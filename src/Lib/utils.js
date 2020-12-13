import { detailedDiff } from 'deep-object-diff';

export const reducerConsoleLogger = (reducer) => {
  const reducerWithLogger = (state, action) => {
    const result = reducer(state, action);

    if (process.env.NODE_ENV !== 'production') {
      const { added, deleted, updated } = detailedDiff(state, result);

      console.group(`%c @@@@ ${reducer.name} called:`, 'color: aquamarine');

      console.groupCollapsed('%c prev state', 'color: purple');
      console.log(state);
      console.groupEnd();

      console.group('@@ ACTION');
      console.log(action);
      console.groupEnd();

      console.groupCollapsed('%c next state', 'color: purple');
      console.log(result);
      console.groupEnd();

      console.group('@@ STATE CHANGES');
      console.log('added', added);
      console.log('deleted', deleted);
      console.log('updated', updated);
      console.groupEnd();

      console.log('\n');

      console.groupEnd();
    }

    return result;
  };

  return reducerWithLogger;
};

export const toPriceString = (price_cents) => {
  const dollarsString = `$${price_cents / 100}`;
  const decimalIndex = dollarsString.indexOf('.');
  const needsTrailingZero = decimalIndex === dollarsString.length - 2;
  const needsDecimal = decimalIndex === -1;

  if (needsTrailingZero) {
    return `${dollarsString}0`;
  }

  if (needsDecimal) {
    return `${dollarsString}.00`;
  }

  return dollarsString;
};
