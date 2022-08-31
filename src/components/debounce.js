// let count = 0;

export const debounce = (fn, delay) => {
  let timer; // = 1

  // incrementCountDebounced
  return function funcDebounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// fn
// let incrementCount = (incAmount) => {
//   console.log((count += incAmount));
// };

// const incrementCountDebunced = debounce(incrementCount, 5000);

// input.addEventListener('keyup', () => {
//   incrementCountDebunced(15);
// });
