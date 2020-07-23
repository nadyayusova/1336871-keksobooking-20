'use strict';

(function () {
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
    window.form.setFormElementsState(window.form.adFormFieldsets, true);
    window.form.setFormElementsState(window.form.mapFilters, true);
    window.form.activateForm(true);
    window.form.setAddress(false);
    window.pin.showPins();
  };

  var setAllInactive = function () {
    window.card.closeCard();
    window.pin.hidePins();
    activateMap(false);
    window.form.setFormElementsState(window.form.adFormFieldsets, false);
    window.form.setFormElementsState(window.form.mapFilters, false);
    window.form.activateForm(false);
    window.form.setAddress(true);
  };

  var setOnce = function () {
    window.form.blockAddressField();
    window.filter.filters.addEventListener('change', function () {
      window.debounce(function () {
        window.card.closeCard();
        window.pin.updatePins();
      });
    });
    window.form.selectCapacity.addEventListener('change', function () {
      window.form.checkCapacity();
    });
    window.form.selectRooms.addEventListener('change', function () {
      window.form.checkCapacity();
    });
    window.form.selectType.addEventListener('change', function () {
      window.form.setPrice();
    });
    window.form.sendButton.addEventListener('click', function () {
      window.form.checkCapacity();
    });
    window.form.adForm.addEventListener('submit', onFormSubmit);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.form.adForm), function () {
      setAllInactive();
      window.form.adForm.reset();

      var successMessage = document.querySelector('.success');
      if (!successMessage) {
        successMessage = successContent.cloneNode(true);
        document.addEventListener('keydown', function (evtKey) {
          if (evtKey.key === 'Escape' && !successMessage.classList.contains('hidden')) {
            successMessage.classList.add('hidden');
          }
        });
        document.addEventListener('click', function () {
          if (!successMessage.classList.contains('hidden')) {
            successMessage.classList.add('hidden');
          }
        });
      }
      successMessage.classList.remove('hidden');
      window.pin.mainSection.appendChild(successMessage);

    }, window.pin.onError);
  };

  window.pin.mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && window.data.map.classList.contains('map--faded')) {
      setAllActive();
    }
  });

  window.pin.mainPin.addEventListener('mousedown', function (evt) {
    window.move.mainPinMousedown(evt);
  });

  window.pin.mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && window.data.map.classList.contains('map--faded')) {
      setAllActive();
    }
  });

  var init = function () {
    window.form.setAddress(true);
    window.form.setFormElementsState(window.form.adFormFieldsets, false);
    window.form.setFormElementsState(window.form.mapFilters, false);
    setOnce();
  };

  init();

})();
