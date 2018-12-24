'use strict';
// secondary.js
(function () {
  var getRandomIntegerFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getRandomElementFromArray = function (arr) {
    return arr[getRandomIntegerFromInterval(0, arr.length - 1)];
  };
  var shuffleArray = function (arr) {
    return arr.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };
  var getRandomSubarray = function (arr) {
    var shuffledArray = shuffleArray(arr);
    var randomEndIndex = getRandomIntegerFromInterval(1, arr.length - 1);
    return shuffledArray.slice(0, randomEndIndex);
  };
  // Taken from https://davidwalsh.name/javascript-debounce-function
  var debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(null, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(null, args);
      }
    };
  };
  var defaultFunctionParam = function (fn) {
    if (typeof fn !== 'function') {
      return function () {};
    }
    return fn;
  }
  window.secondary = {
    getRandomIntegerFromInterval: getRandomIntegerFromInterval,
    getRandomElementFromArray: getRandomElementFromArray,
    shuffleArray: shuffleArray,
    getRandomSubarray: getRandomSubarray,
    debounce: debounce,
    defaultFunctionParam
  };
})();
