// let count = 0;

export const debounce = (fn, delay) => {
  let timer;

  // incrementCountDebounced
  return [
    function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    function () {
      clearTimeout(timer);
    },
  ];
};

// https://codepen.io/piotrszczesniak/pen/ExEJORe
// debouncing https://www.youtube.com/watch?v=F2zF8fu7aG0

// fn
// let incrementCount = (incAmount) => {
//   console.log((count += incAmount));
// };

// const incrementCountDebunced = debounce(incrementCount, 5000);

// input.addEventListener('keyup', () => {
//   incrementCountDebunced(15);
// });
