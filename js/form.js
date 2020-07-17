'use strict';

(function () {
  var Capacity = {
    MIN_CAPACITY: [1, 1, 1, 0],
    MAX_CAPACITY: [1, 2, 3, 0]
  };
  var MainPinSize = {
    HALF_WIDTH: 32,
    HEIGHT: 86
  };
  var minPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filters select, .map__filters fieldset');
  var inputAddress = adForm.querySelector('input[name="address"]');
  var selectRooms = adForm.querySelector('select[name="rooms"]');
  var selectCapacity = adForm.querySelector('select[name="capacity"]');
  var selectType = adForm.querySelector('select[name="type"]');
  var inputPrice = adForm.querySelector('input[name="price"]');
  var sendButton = adForm.querySelector('.ad-form__submit');


  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  var setFormElementsState = function (elementsList, isActive) {
    for (var i = 0; i < elementsList.length; i++) {
      elementsList[i].disabled = !isActive;
    }
  };

  var blockAddressField = function () {
    inputAddress.readOnly = true;
  };

  var setAddress = function (isInitialAddress) {
    inputAddress.value = (parseInt(window.pin.mainPin.style.left, 10) + MainPinSize.HALF_WIDTH) + ', ' +
    (
      parseInt(window.pin.mainPin.style.top, 10) +
      ((isInitialAddress) ? (MainPinSize.HALF_WIDTH) : MainPinSize.HEIGHT)
    );
  };

  var checkCapacity = function () {
    var maxCapacity = Capacity.MAX_CAPACITY[selectRooms.selectedIndex];
    var minCapacity = Capacity.MIN_CAPACITY[selectRooms.selectedIndex];
    var currentCapacity = selectCapacity.value;

    if (currentCapacity < minCapacity) {
      selectCapacity.setCustomValidity('Гостей слишком мало. Для выбранного количесва комнат минимально - ' + minCapacity);
    } else if (currentCapacity > maxCapacity) {
      selectCapacity.setCustomValidity('Гостей слишком много. Для выбранного количесва комнат максимально - ' + maxCapacity);
    } else {
      selectCapacity.setCustomValidity('');
    }
  };

  var setPrice = function () {
    var minPrice = minPrices[selectType.options[selectType.selectedIndex].value];
    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
  };

  window.form = {
    adFormFieldsets: adFormFieldsets,
    mapFilters: mapFilters,
    sendButton: sendButton,
    selectRooms: selectRooms,
    selectCapacity: selectCapacity,
    selectType: selectType,
    activateForm: activateForm,
    setFormElementsState: setFormElementsState,
    setAddress: setAddress,
    blockAddressField: blockAddressField,
    checkCapacity: checkCapacity,
    setPrice: setPrice
  };

})();
