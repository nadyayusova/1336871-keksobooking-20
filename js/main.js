'use strict';

(function () {
  var pinsHere = window.data.map.querySelector('.map__pins');


  var activateMap = function () {
    window.data.map.classList.remove('map--faded');
  };

  var setAllActive = function () {
    activateMap();
    window.form.setFormElementsState(window.form.adFormFieldsets, true);
    window.form.setFormElementsState(window.form.mapFilters, true);
    window.form.activateForm();
    window.form.blockAddressField();
    window.form.setAddress(false);
    pinsHere.appendChild(window.pin.createPins());
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
  };

  init();

})();
