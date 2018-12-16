'use strict';
// pin.js
(function () {
  var ESC_KEYCODE = 27;
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
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < window.data.adverts.length; j++) {
    var dataElement = renderMapPin(window.data.adverts[j]);
    fragment.appendChild(dataElement);
  }
  window.pin = {
    render: renderMapPin,
    fragment: fragment,
    close: closePopup,
    onPopupEsc: onPopupEscPress
  };
})();
