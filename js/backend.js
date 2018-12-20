'use strict';
// backend.js
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data/?calback=data';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.addEventListener('error', function () {
      // onError('Произошла ошибка соединения');
      var template = document.querySelector('#error').content.querySelector('main');
      var errorElement = template.cloneNode(true);
      errorElement.querySelector('.').textContent = 'Ошибка загрузки объявления';
      var fragmentForError = document.createDocumentFragment();
      fragmentForError.appendChild(errorElement);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 1000;
    xhr.send();
  };
  var upLoad = function (data, onLoad, onError) {
    URL = 'XHR https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.backend = {
    load: load,
    upload: upLoad
  };
})();
