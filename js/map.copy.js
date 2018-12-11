'use strict';

// 1 Константы
var COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var CLOUD_X_MIN = 35;
var CLOUD_X_MAX = 1165;
var CLOUD_Y_MIN = 130;
var CLOUD_Y_MAX = 630;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MIN = 1;
var GUESTS_MAX = 7;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAPWIDTH = 1200;
var MAPHEIDTH = 750;
var ESC_KEYCODE = 27;
var PlaceType = {
  BUNGALO: 'Бунгало',
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
};
var MinPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};
var RoomToGuest = {
  ROOM_1: ['1'],
  ROOM_2: ['1', '2'],
  ROOM_3: ['1', '2', '3'],
  ROOM_100: ['0'],
};
// 2 Обычные переменные
var mapListElement = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');
var templateMap = document.querySelector('#pin').content.querySelector('.map__pin');
var template = document.querySelector('#card').content.querySelector('.map__card');
var mainPin = document.querySelector('.map__pin--main');
var formAdress = document.querySelector('.ad-form');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var button = document.querySelector('button');
var fieldsetList = formAdress.querySelectorAll('fieldset');
var roomSelect = document.querySelector('#room_number');
var guestSelect = document.querySelector('#capacity');

// 3 Вспомогательные функции (объявление)
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


// 4 Код программы
var createAdvert = function (k) {
  var x = getRandomIntegerFromInterval(CLOUD_X_MIN, CLOUD_X_MAX);
  var y = getRandomIntegerFromInterval(CLOUD_Y_MIN, CLOUD_Y_MAX);
  var advertObject = {
    author: {
      avatar: 'img/avatars/user0' + (k + 1) + '.png'
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
  var advert = createAdvert(i);
  adverts.push(advert);
}

var renderMapPin = function (advertData) {
  var mapPinTemplate = templateMap.cloneNode(true);
  mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
  mapPinTemplate.querySelector('img').src = advertData.author.avatar;
  mapPinTemplate.querySelector('img').alt = advertData.offer.title;
  mapPinTemplate.addEventListener('click', function () {
    openPopup(advertData);
  });
  return mapPinTemplate;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < adverts.length; j++) {
  var dataElement = renderMapPin(adverts[j]);
  fragment.appendChild(dataElement);
}

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    card.remove();
  }
  document.addEventListener('keydown', onPopupEscPress);
};

var renderAdvert = function (advertOffer) {
  var advertTemplate = template.cloneNode(true);
  advertTemplate.querySelector('.popup__title').textContent = advertOffer.offer.title;
  advertTemplate.querySelector('.popup__text--address').textContent = advertOffer.offer.address;
  advertTemplate.querySelector('.popup__text--price').textContent = advertOffer.offer.price + '₽/ночь';

  advertTemplate.querySelector('.popup__text--capacity').textContent = advertOffer.offer.rooms + ' комнаты для ' + advertOffer.offer.guests + ' гостей';
  advertTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertOffer.offer.checkin + ' выезд до ' + advertOffer.offer.checkout;

  advertTemplate.querySelector('.popup__features').innerHTML = '';
  var fragmentForFeatures = document.createDocumentFragment();
  for (var m = 0; m < advertOffer.offer.features.length; m++) {
    var photoFeature = document.createElement('li');
    photoFeature.classList.add('popup__feature');
    var className = 'popup__feature--' + advert.offer.features[m];
    photoFeature.classList.add(className);
    fragmentForFeatures.appendChild(photoFeature);
  }
  advertTemplate.querySelector('.popup__features').appendChild(fragmentForFeatures);
  advertTemplate.querySelector('.popup__description').textContent = advertOffer.offer.description;

  advertTemplate.querySelector('.popup__photos').innerHTML = '';
  var fragmentForPhotos = document.createDocumentFragment();
  for (j = 0; j < advertOffer.offer.photos.length; j++) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = advertOffer.offer.photos[j];
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    fragmentForPhotos.appendChild(photo);
  }
  advertTemplate.querySelector('.popup__photos').appendChild(fragmentForPhotos);
  advertTemplate.classList.remove('.popup__avatar');
  advertTemplate.querySelector('.popup__avatar').src = advertOffer.author.avatar;
  advertTemplate.querySelector('.popup__type').textContent = PlaceType[advertOffer.offer.type.toUpperCase()];
  advertTemplate.querySelector('.popup__close').addEventListener('click', closePopup);
  return advertTemplate;
};
// Активация страницы
var activeForm = function () {
  mapListElement.classList.remove('map--faded');
  formAdress.classList.remove('ad-form--disabled');
  document.querySelector('.map__pins').appendChild(fragment);
};
var setAddressCoords = function (x, y) {
  formAdress.querySelector('#address').value = x + ', ' + y;
};
var activatePage = function () {
  activeForm();
  setAddressCoords(MAPWIDTH / 2, MAPHEIDTH / 2);
  mainPin.removeEventListener('mouseup', activatePage);
  for (i = 0; i < fieldsetList.length; i++) {
    var fieldsetTag = fieldsetList[i];
    fieldsetTag.disabled = false;
  }
};

var openPopup = function (informAdvert) {
  closePopup();
  var card = renderAdvert(informAdvert);
  mapListElement.insertBefore(card, filtersContainer);
  document.addEventListener('keydown', onPopupEscPress);
};

//
type.addEventListener('сhange', function () {
  price.min = MinPrice[type.value.toUpperCase()];
  price.placeholder = MinPrice[type.value.toUpperCase()];
});
timein.addEventListener('change', function (evt) {
  timein.value = evt.target.value;
});
timeout.addEventListener('change', function (evt) {
  timeout.value = evt.target.value;
});
var validateGuestAndRoom = function () {
  var guests = RoomToGuest['ROOM_' + roomSelect.value];
  var isMatch = false;
  for (i = 0; i < guests.length - 1; i++) {
    if (guests[i] === guestSelect.value) {
      isMatch = true;
      break;
    }
  }
  if (isMatch) {
    roomSelect.setCustomValidity('');
  } else {
    roomSelect.setCustomValidity('Количество гостей больше возможного');
  }
};
var onSubmitClick = function () {
  validateGuestAndRoom();
};
button.addEventListener('click', onSubmitClick);

// drag.js
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  mainPin.addEventListener('mouseup', activatePage);
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAddressCoords(startCoords);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function () {
        evt.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }

  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
