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
// pin.js
(function () {
  var templateMap = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderMapPin = function (advertData) {
    var mapPinTemplate = templateMap.cloneNode(true);
    mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
    mapPinTemplate.querySelector('img').src = advertData.author.avatar;
    mapPinTemplate.querySelector('img').alt = advertData.offer.title;
    mapPinTemplate.addEventListener('click', function () {
      window.form.open(advertData);
    });
    return mapPinTemplate;
  };
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.data.adverts.length; j++) {
    var dataElement = window.renderMapPin(window.data.adverts[j]);
    fragment.appendChild(dataElement);
  }
  window.pin = {
    render: renderMapPin,
    fragment: fragment
  };
})();
// card.js
(function () {
  var PlaceType = {
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
  };
  var template = document.querySelector('#card').content.querySelector('.map__card');
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
      var className = 'popup__feature--' + advertOffer.offer.features[m];
      photoFeature.classList.add(className);
      fragmentForFeatures.appendChild(photoFeature);
    }
    advertTemplate.querySelector('.popup__features').appendChild(fragmentForFeatures);
    advertTemplate.querySelector('.popup__description').textContent = advertOffer.offer.description;
    advertTemplate.querySelector('.popup__photos').innerHTML = '';
    var fragmentForPhotos = document.createDocumentFragment();
    for (var j = 0; j < advertOffer.offer.photos.length; j++) {
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
    advertTemplate.querySelector('.popup__close').addEventListener('click', window.popup.close);
    return advertTemplate;
  };
  window.card = {
    render: renderAdvert
  };
})();

// form.js
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var formAdress = document.querySelector('.ad-form');
  var typeSelect = formAdress.querySelector('#type');
  var priceSelect = formAdress.querySelector('#price');
  var timeinSelect = formAdress.querySelector('#timein');
  var timeoutSelect = formAdress.querySelector('#timeout');
  var button = formAdress.querySelector('.ad-form__submit');
  var fieldsetList = formAdress.querySelectorAll('fieldset');
  var roomSelect = formAdress.querySelector('#room_number');
  var guestSelect = formAdress.querySelector('#capacity');
  var mapListElement = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var ESC_KEYCODE = 27;
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
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
  var activeForm = function () {
    mapListElement.classList.remove('map--faded');
    formAdress.classList.remove('ad-form--disabled');
    document.querySelector('.map__pins').appendChild(window.pin.fragment);
  };
  var setAddressCoords = function (x, y) {
    formAdress.querySelector('#address').value = x + ', ' + y;
  };
  var activatePage = function () {
    activeForm();
    setAddressCoords(MAP_WIDTH / 2, MAP_HEIGTH / 2);
    mainPin.removeEventListener('mouseup', activatePage);
    for (var i = 0; i < fieldsetList.length; i++) {
      var fieldsetTag = fieldsetList[i];
      fieldsetTag.disabled = false;
    }
  };
  var openPopup = function (informAdvert) {
    closePopup();
    var cardAdd = window.card.render(informAdvert);
    mapListElement.insertBefore(cardAdd, filtersContainer);
    document.addEventListener('keydown', onPopupEscPress);
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
  typeSelect.addEventListener('change', function () {
    priceSelect.min = MinPrice[typeSelect.value.toUpperCase()];
    priceSelect.placeholder = MinPrice[typeSelect.value.toUpperCase()];
  });
  timeinSelect.addEventListener('change', function (evt) {
    timeoutSelect.value = evt.target.value;
  });
  timeoutSelect.addEventListener('change', function (evt) {
    timeinSelect.value = evt.target.value;
  });
  var validateGuestAndRoom = function () {
    var rooms = RoomToGuest['ROOM_' + roomSelect.value];
    var isMatch = false;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i] === guestSelect.value) {
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
  window.form = {
    mapWidth: MAP_WIDTH,
    mapHeight: MAP_HEIGTH,
    mainPin: mainPin,
    activate: activatePage,
    open: openPopup,
    set: setAddressCoords
  };
})();

// drag.js
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGTH = 750;
  var MAIN_PIN_WIDTH = 65;
  var BORDER_MIN_TOP = 130;
  var BORDER_MAX_BOTTOM = 630;
  var MAIN_PIN_HEIGHT = 81;
  window.form.mainPin.addEventListener('mousedown', function (mousedownEvt) {
    window.form.activate();
    var pinStatusCoords = {
      x: MAP_WIDTH / 2 - MAIN_PIN_WIDTH / 2,
      y: MAP_HEIGTH / 2 - MAIN_PIN_HEIGHT
    };

    var startCoords = {
      x: mousedownEvt.clientX,
      y: mousedownEvt.clientY
    };

    var onMouseMove = function (mouseMoveEvt) {
      var shift = {
        x: startCoords.x - mouseMoveEvt.clientX,
        y: startCoords.y - mouseMoveEvt.clientY
      };

      startCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var pinCoords = {
        x: window.form.mainPin.offsetLeft - shift.x,
        y: window.form.mainPin.offsetTop - shift.y
      };

      var border = {
        left: 0,
        right: MAP_WIDTH - MAIN_PIN_WIDTH,
        top: BORDER_MIN_TOP - MAIN_PIN_HEIGHT,
        bottom: BORDER_MAX_BOTTOM - MAIN_PIN_HEIGHT

      };
      if (pinCoords.x >= border.left && pinCoords.x <= border.right) {
        window.form.mainPin.style.left = pinCoords.x + 'px';
        pinStatusCoords.x = pinCoords.x + MAIN_PIN_WIDTH / 2;
      }
      if (pinCoords.y >= border.top && pinCoords.y <= border.bottom) {
        window.form.mainPin.style.top = pinCoords.y + 'px';
        pinStatusCoords.y = pinCoords.y + MAIN_PIN_HEIGHT;
      }
      window.form.set(pinStatusCoords.x, pinStatusCoords.y);
    };
    var onMouseUp = function () {
      window.form.set(pinStatusCoords.x, pinStatusCoords.y);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
