'use strict';
// data.js
(function () {
  var COUNT = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MAX = 5;
  var ROOMS_MIN = 1;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 7;
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var createAdvert = function (k) {
    var x = window.secondary.randomInteger(0, MAP_WIDTH);
    var y = window.secondary.randomInteger(0, MAP_HEIGTH);
    var advertObject = {
      author: {
        avatar: 'img/avatars/user0' + (k + 1) + '.png'
      },
      offer: {
        title: window.secondary.randomElement(TITLES),
        address: x + ', ' + y,
        price: window.secondary.randomInteger(PRICE_MIN, PRICE_MAX),
        type: window.secondary.randomElement(TYPES),
        rooms: window.secondary.randomInteger(ROOMS_MIN, ROOMS_MAX),
        guests: window.secondary.randomInteger(GUESTS_MIN, GUESTS_MAX),
        checkin: window.secondary.randomElement(CHECKIN_TIME),
        checkout: window.secondary.randomElement(CHECKOUT_TIME),
        features: window.secondary.get(FEATURES),
        description: '',
        photos: window.secondary.shuffle(PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
    return advertObject;
  };
  var adverts = [];
  for (var i = 0; i < COUNT; i++) {
    var advert = createAdvert(i);
    adverts.push(advert);
  }
  window.data = {
    create: createAdvert,
    adverts: adverts
  };
})();
