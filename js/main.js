'use strict';

(function () {
  var Initial = {
    MAIN_PIN_STYLE: 'left: 570px; top: 375px;',
    ADDRESS: '602, 407',
    AVATAR: 'img/muffin-grey.svg'
  };
  var inputAddress = document.querySelector('input[name="address"]');
  var avatarImg = document.querySelector('.ad-form-header__preview');
  var filtersForm = document.querySelector('.map__filters');
  var successTemplate = document.querySelector('#success');
  var successContent = successTemplate.content.querySelector('.success');

  var activateMap = function (isTurnActive) {
    window.data.map.classList.toggle('map--faded', !isTurnActive);
  };

  var setAllActive = function () {
    activateMap(true);
    window.formModule.setFormElementsState(window.formModule.adFormFieldsets, true);
    window.formModule.activateForm(true);
    window.formModule.setAddress(false);
    window.pinModule.showPins();
  };

  var resetPictures = function () {
    avatarImg.children[0].src = Initial.AVATAR;
    var photoPreviews = document.querySelectorAll('.ad-form__photo');
    photoPreviews.forEach(function (photo, i) {
      if (i > 0) {
        photo.remove();
      }
    });
    if (photoPreviews[0].children[0]) {
      photoPreviews[0].children[0].remove();
    }
  };

  var setAllInactive = function () {
    window.pinModule.mainPin.style = Initial.MAIN_PIN_STYLE;
    resetPictures();
    filtersForm.reset();
    window.cardModule.closeCard();
    window.pinModule.hidePins();
    activateMap(false);
    window.formModule.setFormElementsState(window.formModule.adFormFieldsets, false);
    window.formModule.setFormElementsState(window.formModule.mapFilters, false);
    window.formModule.mapFeatures.style.opacity = 0.3;
    window.formModule.activateForm(false);
    window.formModule.setAddress(true);
  };

  var setOnce = function () {
    window.formModule.blockAddressField();
    inputAddress.placeholder = Initial.ADDRESS;
    window.filterModule.filters.addEventListener('change', function () {
      window.pinModule.updatePins();
    });
    window.formModule.selectCapacity.addEventListener('change', function () {
      window.formModule.checkCapacity();
    });
    window.formModule.selectRooms.addEventListener('change', function () {
      window.formModule.checkCapacity();
    });
    window.formModule.selectType.addEventListener('change', function () {
      window.formModule.setPrice();
    });
    window.formModule.sendButton.addEventListener('click', function () {
      window.formModule.checkCapacity();
    });
    window.formModule.selectTimeIn.addEventListener('change', function (evt) {
      window.formModule.setTimes(evt.target);
    });
    window.formModule.selectTimeOut.addEventListener('change', function (evt) {
      window.formModule.setTimes(evt.target);
    });
    window.formModule.adForm.addEventListener('submit', onFormSubmit);
    window.formModule.adForm.addEventListener('reset', onFormReset);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.formModule.adForm), function () {
      setAllInactive();
      window.formModule.adForm.reset();

      var successMessage = document.querySelector('.success');
      if (!successMessage) {
        successMessage = successContent.cloneNode(true);
      }
      window.message.showMessage(successMessage);
      window.pinModule.mainSection.appendChild(successMessage);

    }, window.pinModule.onError);
  };

  var onFormReset = function () {
    setAllInactive();
  };

  window.pinModule.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.data.map.classList.contains('map--faded')) {
      setAllActive();
    }
  });

  window.pinModule.mainPin.addEventListener('mousedown', function (evt) {
    window.move.mainPinMousedown(evt);
  });

  window.pinModule.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.data.map.classList.contains('map--faded')) {
      setAllActive();
    }
  });

  var init = function () {
    window.formModule.setAddress(true);
    window.formModule.setFormElementsState(window.formModule.adFormFieldsets, false);
    window.formModule.setFormElementsState(window.formModule.mapFilters, false);
    window.formModule.mapFeatures.style.opacity = 0.3;
    setOnce();
  };

  init();

})();
