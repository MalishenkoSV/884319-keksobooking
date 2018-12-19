'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var filtersContainer = document.querySelector('.map__filters-container');
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var mapListCardElement = document.querySelector('.map');
  var PlaceType = {
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
  };
  var createAdvert = function (advertOffer) {
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
    advertTemplate.querySelector('.popup__close').addEventListener('click', closePopup);
    advertTemplate.querySelector('.popup__close').addEventListener('keydown', onPopupEnterPress);
    if (advertOffer.offer.features === 0) {
      advertTemplate.setAttribute('style', 'display:none');
    }
    return advertTemplate;
  };
  var showCardOnMap = function (advertOffer) {
    closePopup();
    var cardElement = createAdvert(advertOffer);
    mapListCardElement.insertBefore(cardElement, filtersContainer);
    document.addEventListener('keydown', onPopupEscPress);
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };
  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };
  var closePopup = function () {
    var card = document.querySelector('.map__card.popup');
    if (card) {
      card.remove();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };
  window.card = {
    showCardOnMap: showCardOnMap
  };
})();
