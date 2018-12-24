'use strict';
// oшибки
(function () {
  var main = document.querySelector('main');
  var successPopupTemplate = document.querySelector('#success');
  var errorPopupTemplate = document.querySelector('#error');
  var KEY_CODES = 27;
  var showSuccessMessage = function () {
    var cloneSuccessPopupTemplate = successPopupTemplate.content.cloneNode(true);
    var successPopup = cloneSuccessPopupTemplate.querySelector('.success');
    main.appendChild(cloneSuccessPopupTemplate);
    var closeSuccessMessage = function () {
      document.removeEventListener('keydown', onKeyPressError);
      successPopup.removeEventListener('click', closeSuccessMessageOnOutClick);
      main.remove(successPopup);
    };
    var onKeyPressError = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === KEY_CODES) {
        closeSuccessMessage();
      }
    };
    var closeSuccessMessageOnOutClick = function (evt) {
      evt.preventDefault();
      if (evt.target === successPopup) {
        closeSuccessMessage();
      }
    };
    document.addEventListener('keydown', onKeyPressError);
    successPopup.addEventListener('click', closeSuccessMessageOnOutClick);
    onKeyPressError();
  };
  var showSubmitFormError = function () {
    var cloneErrorTemplate = errorPopupTemplate.content.cloneNode(true);
    var errorBlock = cloneErrorTemplate.querySelector('.error');
    var errorMessage = cloneErrorTemplate.querySelector('.error__message');
    errorMessage.textContent = 'Ошибка заполнения. Пожалуйста, исправьте форму и попробуйте еще раз.';
    main.appendChild(cloneErrorTemplate);
    var closeErrorMessage = function () {
      document.removeEventListener('keydown', onKeyPressOnError);
      errorBlock.removeEventListener('click', closeErrorMessageOnOutClick);
      main.removeChild(errorBlock);
    };
    var onKeyPressOnError = function (evt) {
      if (evt.keyCode === KEY_CODES.esc) {
        closeErrorMessage();
      }
    };
    var closeErrorMessageOnOutClick = function (evt) {
      evt.preventDefault();
      if (evt.target === errorBlock) {
        closeErrorMessage();
      }
    };
    closeErrorMessage();
    document.addEventListener('keydown', onKeyPressOnError);
    errorBlock.addEventListener('click', closeErrorMessageOnOutClick);
  };

  window.error = {
    showSuccessMessage: showSuccessMessage,
    showSubmitFormError: showSubmitFormError
  };
})();
