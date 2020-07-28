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
  var TitleLength = {
    MIN_LENGTH: 30,
    MAX_LENGTH: 100
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filters select, .map__filters fieldset, .map__features input');
  var mapFeatures = document.querySelector('.map__features');
  var inputTitle = adForm.querySelector('input[name="title"]');
  var inputAddress = adForm.querySelector('input[name="address"]');
  var selectRooms = adForm.querySelector('select[name="rooms"]');
  var selectCapacity = adForm.querySelector('select[name="capacity"]');
  var selectType = adForm.querySelector('select[name="type"]');
  var inputPrice = adForm.querySelector('input[name="price"]');
  var selectTimeIn = adForm.querySelector('select[name="timein"]');
  var selectTimeOut = adForm.querySelector('select[name="timeout"]');
  var sendButton = adForm.querySelector('.ad-form__submit');


  var activateForm = function (isTurnActive) {
    adForm.classList.toggle('ad-form--disabled', !isTurnActive);
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
    inputAddress.value = (parseInt(window.pinModule.mainPin.style.left, 10) + MainPinSize.HALF_WIDTH) + ', ' +
    (
      parseInt(window.pinModule.mainPin.style.top, 10) +
      ((isInitialAddress) ? (MainPinSize.HALF_WIDTH) : MainPinSize.HEIGHT)
    );
  };

  var checkCapacity = function () {
    var maxCapacity = Capacity.MAX_CAPACITY[selectRooms.selectedIndex];
    var minCapacity = Capacity.MIN_CAPACITY[selectRooms.selectedIndex];
    var currentCapacity = selectCapacity.value;

    if (currentCapacity < minCapacity) {
      selectCapacity.setCustomValidity('Гостей слишком мало. Для выбранного количесва комнат минимально - ' + minCapacity);
      selectCapacity.style.border = '2px solid red';
    } else if (currentCapacity > maxCapacity) {
      selectCapacity.setCustomValidity('Гостей слишком много. Для выбранного количесва комнат максимально - ' + maxCapacity);
      selectCapacity.style.border = '2px solid red';
    } else {
      selectCapacity.setCustomValidity('');
      selectCapacity.removeAttribute('style');
    }
  };

  var setPrice = function () {
    var minPrice = minPrices[selectType.options[selectType.selectedIndex].value];
    inputPrice.min = minPrice;
    inputPrice.placeholder = minPrice;
  };

  inputTitle.addEventListener('input', function () {
    var titleLength = inputTitle.value.length;

    if (titleLength < TitleLength.MIN_LENGTH || titleLength > TitleLength.MAX_LENGTH) {
      inputTitle.style.border = '2px solid red';
    } else {
      inputTitle.removeAttribute('style');
    }
  });

  inputTitle.addEventListener('invalid', function () {
    inputTitle.style.border = '2px solid red';
  });

  inputPrice.addEventListener('input', function () {
    var priceValue = inputPrice.value;
    var minPrice = inputPrice.getAttribute('min');
    var maxPrice = inputPrice.getAttribute('max');

    if (priceValue === '' || Number(priceValue) < minPrice || Number(priceValue) > maxPrice) {
      inputPrice.style.border = '2px solid red';
    } else {
      inputPrice.removeAttribute('style');
    }
  });

  inputPrice.addEventListener('invalid', function () {
    inputPrice.style.border = '2px solid red';
  });

  var setTimes = function (changedSelect) {
    if (changedSelect.name === 'timein') {
      selectTimeOut.value = selectTimeIn.value;
    } else {
      selectTimeIn.value = selectTimeOut.value;
    }
  };


  window.formModule = {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    mapFilters: mapFilters,
    mapFeatures: mapFeatures,
    sendButton: sendButton,
    selectRooms: selectRooms,
    selectCapacity: selectCapacity,
    selectType: selectType,
    selectTimeIn: selectTimeIn,
    selectTimeOut: selectTimeOut,
    activateForm: activateForm,
    setFormElementsState: setFormElementsState,
    setAddress: setAddress,
    blockAddressField: blockAddressField,
    checkCapacity: checkCapacity,
    setPrice: setPrice,
    setTimes: setTimes
  };

})();
