'use strict';
// pin.js
(function () {
  var mapListPinElement = document.querySelector('.map__pins');
  var templateMap = document.querySelector('#pin').content.querySelector('.map__pin');
  var createMapPin = function (advertData) {
    var mapPinTemplate = templateMap.cloneNode(true);
    mapPinTemplate.style = 'left:' + advertData.location.x + 'px; top:' + advertData.location.y + 'px;';
    mapPinTemplate.querySelector('img').src = advertData.author.avatar;
    mapPinTemplate.querySelector('img').alt = advertData.offer.title;
    mapPinTemplate.addEventListener('click', function () {
      window.card.showCardOnMap(advertData);
    });
    return mapPinTemplate;
  };
  var advertOffers = window.data.getAdverts();
  var showPinsOnMap = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertOffers.length; i++) {
      var dataElement = createMapPin(advertOffers[i]);
      fragment.appendChild(dataElement);
      mapListPinElement.appendChild(fragment);
    }
    return showPinsOnMap;
  };
  window.pin = {
    showPinsOnMap: showPinsOnMap
  };
})();
