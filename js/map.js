'use strict';
var NUMBERS_ADVARTISEMENT = 8;
var AUTHORS_ADVARTISEMENT = 8;
var TITLE_ADVARTISEMENT = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var CLOUD_X_MIN = 50;
var CLOUD_X_MAX = 1198;
var CLOUD_Y_MIN = 50;
var CLOUD_Y_MAX = 702;
var TYPE_ADVARTISEMENT = ['palace', 'flat', 'house', 'bungalo'];
var NUMBER_ROOMS_MAX = 5;
var NUMBER_ROOMS_MIN = 1;
var NUMBER_GUESTS_MIN = 1;
var NUMBER_GUESTS_MAX = 7;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES_ADVARTISEMENT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ADVARTISEMENT = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomIntegerFromInterval = function (min, max) {
  return Math.floor(Math.random()*(max - min + 1)) + min;
};
var getRandomElementFromArray = function (arr) {
  return arr[getRandomIntegerFromInterval(0, arr.length - 1)];
};
var randomCreateArray = function (arr) {
  return arr.slice().sort(function () {
  return Math.round(Math.random());
  });
};
var getRandomArrayNumber = function (arr) {
  var randomCreateArrayNew = randomCreateArray (arr);
  var randomEndIndex = getRandomIntegerFromInterval(1, arr.length-1);
  return randomCreateArrayNew.slice(0, randomEndIndex);
};

var createAdvartisement = function () {
  var x = getRandomIntegerFromInterval(CLOUD_X_MIN, CLOUD_X_MAX);
  var y = getRandomIntegerFromInterval(CLOUD_Y_MIN, CLOUD_Y_MAX);
  var advartisement = {
       author : {
         avatar : 'img/avatars/user0' + getRandomIntegerFromInterval(1, AUTHORS_ADVARTISEMENT) + '.png',
       },
       offer : {
        title : getRandomElementFromArray(TITLE_ADVARTISEMENT),
        address : x + ', ' + y,
        price : getRandomIntegerFromInterval(PRICE_MIN, PRICE_MAX),
        type : getRandomElementFromArray(TYPE_ADVARTISEMENT),
        rooms : getRandomIntegerFromInterval(NUMBER_ROOMS_MIN, NUMBER_ROOMS_MAX),
        guests :  getRandomIntegerFromInterval(NUMBER_GUESTS_MIN, NUMBER_GUESTS_MAX),
        checkin : getRandomElementFromArray(CHECKIN_TIME),
        checkout : getRandomElementFromArray(CHECKOUT_TIME),
        features : getRandomArrayNumber(FEATURES_ADVARTISEMENT),
        description : '',
        photos : randomCreateArray(PHOTOS_ADVARTISEMENT)
       },
       location : {
        x : x,
        y : y
    }
  };
var  advartisements = [];
for (var i = 0; i < NUMBERS_ADVARTISEMENT; i++) {
  var advartisement = createAdvartisement();
  advartisements.push(advartisement);
}

var mapListElement = document.querySelector('.map');
  map.classList.remove('map--faded');
var mapPinListElement = map.querySelector('.map__pins');

var mapTemplate = document.querySelector('#pin')
    .content
    .querySelector('.setup-similar-item');
var rendermapPin = function (map) {
  var mapPinElement = mapTemplate.cloneNode(true);
    mapPinElement.querySelector('.map__pin').style = 'left : ' + x + 'px'; 'top:' + y + 'px';
    mapPinElement.src = author.avatar;
    mapPinElement.alt = offer.title;
    return mapPinElement;
  };
var fragment = document.createDocumentFragment();
  for (var j = 0; j < advartisements.length; j++) {
    fragment.appendChild(mapPinElement);
    mapPinListElement.appendChild(fragment);
  }

var advartisementTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderAdvartisement = function () {
    var advartisementElement = advartisementTemplate.cloneNode(true);
    advartisementElement.querySelector('.popup__title').textContent = offer.title;
    advartisementElement.querySelector('.popup__text--address').textContent = offer.address;
    advartisementElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    advartisementElement.querySelector('.popup__type').textContent = offer.type;
    advartisementElement.querySelector('.popup__text--capacity').textContent = offer.rooms + 'комнаты для' + offer.guests + 'гостей';
    advartisementElement.querySelector('.popup__text--time').textContent = 'Заезд после' + offer.checkin + 'выезд до' + offer.checkout;
    advartisementElement.querySelector('.popup__features').textContent = offer.features;
    advartisementElement.querySelector('..popup__description').textContent = offer.description;
    for (var i = 0; i < photos.length - 1; i++) {
      advartisementElement.querySelector('.popup__photos').src = offer.photos;
    }
  advartisementElement.classList.remove('.popup__photos');
  advartisementElement.querySelector('.popup__avatar').src = author.avatar;
};
return advartisementElement

var fragment = document.createDocumentFragment();
  for (var j = 0; j < advartisements.length; j++) {
  fragment.appendChild(renderAdvartisement(advartisements[j]));
  mapListElement.insertBefore(fragment, '.map__filters-container');
};
