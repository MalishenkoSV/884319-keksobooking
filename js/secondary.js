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
  window.secondary = {
    randomInteger: getRandomIntegerFromInterval,
    randomElement: getRandomElementFromArray,
    shuffle: shuffleArray,
    get: getRandomSubarray
  };
})();
