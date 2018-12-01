'use strict';
var COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var CLOUD_X_MIN = 0;
var CLOUD_X_MAX = 1200;
var CLOUD_Y_MIN = 0;
var CLOUD_Y_MAX = 704;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MIN = 1;
var GUESTS_MAX = 7;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

var createAdvert = function () {
  for (var i = 1; i < COUNT; i++) {
    var avatar = i + 1;
  }
  var x = getRandomIntegerFromInterval(CLOUD_X_MIN, CLOUD_X_MAX);
  var y = getRandomIntegerFromInterval(CLOUD_Y_MIN, CLOUD_Y_MAX);
  var advertObject = {
    author: {
      avatar: 'img/avatars/user0' + avatar + '.png'
    },
    offer: {
      title: getRandomElementFromArray(TITLES),
      address: x + ', ' + y,
      price: getRandomIntegerFromInterval(PRICE_MIN, PRICE_MAX),
      type: getRandomElementFromArray(TYPES),
      rooms: getRandomIntegerFromInterval(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomIntegerFromInterval(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomElementFromArray(CHECKIN_TIME),
      checkout: getRandomElementFromArray(CHECKOUT_TIME),
      features: getRandomSubarray(FEATURES),
      description: '',
      photos: shuffleArray(PHOTOS)
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
  var advert = createAdvert();
  adverts.push(advert);
}

var mapListElement = document.querySelector('.map');
mapListElement.classList.remove('map--faded');
var mapPinListElement = mapListElement.querySelector('.map__pins');

var mapTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderMapPin = function () {
  var advertMap = advert;
  var mapPinElement = mapTemplate.cloneNode(true);
  mapPinElement.querySelector('.map__pin').style.left = 'left: ' + advertMap.location.x + 'px';
  mapPinElement.querySelector('.map__pin').style.top = 'top: ' + advertMap.location.y + 'px';
  mapPinElement.src = advertMap.author.avatar;
  mapPinElement.alt = advertMap.offer.title;
  return mapPinElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < adverts.length; j++) {
  fragment.appendChild(renderMapPin(adverts[j]));
  mapPinListElement.appendChild(fragment);
}

var advertTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

var renderAdvartisement = function () {
  var advertOffers = adverts;
  var advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = advertOffers.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = advertOffers.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = advertOffers.offer.price + '₽/ночь';
  advertElement.querySelector('.popup__type').textContent = advertOffers.offer.type;
  advertElement.querySelector('.popup__text--capacity').textContent = advertOffers.offer.rooms + 'комнаты для' + advertOffers.offer.guests + 'гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после' + advertOffers.offer.checkin + 'выезд до' + advertOffers.offer.checkout;
  advertElement.querySelector('.popup__features').textContent = advertOffers.offer.features;
  advertElement.querySelector('..popup__description').textContent = advertOffers.offer.description;
  for (i = 0; i < advertOffers.offer.photos.length - 1; i++) {
    advertElement.querySelector('.popup__photos').src = advertOffers.offer.photos;
  }
  advert.classList.remove('.popup__photos');
  advert.querySelector('.popup__avatar').src = advertOffers.author.avatar;
  return advertElement;
};

var fragmentAdvartisement = document.createDocumentFragment();
for (j = 0; j < adverts.length; j++) {
  fragmentAdvartisement.appendChild(renderAdvartisement(adverts[j]));
}
