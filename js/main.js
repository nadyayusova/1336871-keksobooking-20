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
    if (isTurnActive) {
      window.data.map.classList.remove('map--faded');
    } else {
      window.data.map.classList.add('map--faded');
    }
  };

  var setAllActive = function () {
    activateMap(true);
    window.formmodule.setFormElementsState(window.formmodule.adFormFieldsets, true);
    window.formmodule.activateForm(true);
    window.formmodule.setAddress(false);
    window.pinmodule.showPins();
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
    window.pinmodule.mainPin.style = Initial.MAIN_PIN_STYLE;
    resetPictures();
    filtersForm.reset();
    window.cardmodule.closeCard();
    window.pinmodule.hidePins();
    activateMap(false);
    window.formmodule.setFormElementsState(window.formmodule.adFormFieldsets, false);
    window.formmodule.setFormElementsState(window.formmodule.mapFilters, false);
    window.formmodule.mapFeatures.style.opacity = 0.3;
    window.formmodule.activateForm(false);
    window.formmodule.setAddress(true);
  };

  var setOnce = function () {
    window.formmodule.blockAddressField();
    inputAddress.placeholder = Initial.ADDRESS;
    window.filtermodule.filters.addEventListener('change', function () {
      window.pinmodule.updatePins();
    });
    window.formmodule.selectCapacity.addEventListener('change', function () {
      window.formmodule.checkCapacity();
    });
    window.formmodule.selectRooms.addEventListener('change', function () {
      window.formmodule.checkCapacity();
    });
    window.formmodule.selectType.addEventListener('change', function () {
      window.formmodule.setPrice();
    });
    window.formmodule.sendButton.addEventListener('click', function () {
      window.formmodule.checkCapacity();
    });
    window.formmodule.selectTimeIn.addEventListener('change', function (evt) {
      window.formmodule.setTimes(evt.target);
    });
    window.formmodule.selectTimeOut.addEventListener('change', function (evt) {
      window.formmodule.setTimes(evt.target);
    });
    window.formmodule.adForm.addEventListener('submit', onFormSubmit);
    window.formmodule.adForm.addEventListener('reset', onFormReset);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.formmodule.adForm), function () {
      setAllInactive();
      window.formmodule.adForm.reset();

      var successMessage = document.querySelector('.success');
      if (!successMessage) {
        successMessage = successContent.cloneNode(true);
      }
      window.message.showMessage(successMessage);
      window.pinmodule.mainSection.appendChild(successMessage);

    }, window.pinmodule.onError);
  };

  var onFormReset = function () {
    setAllInactive();
  };

  window.pinmodule.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.data.map.classList.contains('map--faded')) {
      setAllActive();
    }
  });

  window.pinmodule.mainPin.addEventListener('mousedown', function (evt) {
    window.move.mainPinMousedown(evt);
  });

  window.pinmodule.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.data.map.classList.contains('map--faded')) {
      setAllActive();
    }
  });

  var init = function () {
    window.formmodule.setAddress(true);
    window.formmodule.setFormElementsState(window.formmodule.adFormFieldsets, false);
    window.formmodule.setFormElementsState(window.formmodule.mapFilters, false);
    window.formmodule.mapFeatures.style.opacity = 0.3;
    setOnce();
  };

  init();

})();
