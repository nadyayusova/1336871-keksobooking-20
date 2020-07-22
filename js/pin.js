'use strict';

(function () {
  var PinSize = {
    HALF_WIDTH: 25,
    HEIGHT: 70
  };
  var mainPin = window.data.map.querySelector('.map__pin--main');
  var pinTemplate = document.querySelector('#pin');
  var pinContent = pinTemplate.content.querySelector('.map__pin');
  var pinsHere = window.data.map.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error');
  var errorContent = errorTemplate.content.querySelector('.error');
  var mainSection = document.querySelector('main');


  var renderPin = function (adv) {
    var pin = pinContent.cloneNode(true);

    pin.style.left = adv.location.x + PinSize.HALF_WIDTH + 'px';
    pin.style.top = adv.location.y + PinSize.HEIGHT + 'px';
    pin.children[0].src = adv.author.avatar;
    pin.children[0].alt = adv.offer.title;
    pin.addEventListener('click', function () {
      window.card.renderCard(adv);
    });

    return pin;
  };

  var createPins = function (adv) {
    var fragment = document.createDocumentFragment();
    var pinsCount = Math.min(window.data.MAX_ADV_COUNT, adv.length);

    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(renderPin(adv[i]));
    }

    return fragment;
  };

  var onLoad = function (data) {
    window.data.advertisements = data;
    updatePins();
  };

  var onError = function (errorText) {
    var errorMessage = document.querySelector('.error');

    if (!errorMessage) {
      errorMessage = errorContent.cloneNode(true);
      var errorButton = errorMessage.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        errorMessage.classList.add('hidden');
        showPins();
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape' && !errorMessage.classList.contains('hidden')) {
          errorMessage.classList.add('hidden');
        }
      });
      document.addEventListener('click', function () {
        if (!errorMessage.classList.contains('hidden')) {
          errorMessage.classList.add('hidden');
        }
      });
    }
    errorMessage.querySelector('.error__message').textContent = errorText;
    errorMessage.classList.remove('hidden');

    mainSection.appendChild(errorMessage);
  };

  var showPins = function () {
    window.backend.load(onLoad, onError);
  };

  var hidePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var updatePins = function () {
    hidePins();
    var filteredHousingTypes =
      window.filter.applyFilter(window.data.advertisements, 'type', window.filter.currentHousingType);
    pinsHere.appendChild(createPins(filteredHousingTypes));
  };

  window.pin = {
    mainPin: mainPin,
    mainSection: mainSection,
    onError: onError,
    showPins: showPins,
    hidePins: hidePins,
    updatePins: updatePins
  };

})();
