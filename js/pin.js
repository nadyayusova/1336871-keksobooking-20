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

    for (var i = 0; i < adv.length; i++) {
      fragment.appendChild(renderPin(adv[i]));
    }

    return fragment;
  };

  var onLoad = function (data) {
    pinsHere.appendChild(createPins(data));
  };

  var onError = function (errorText) {
    var errorMessage = document.querySelector('.error');

    if (!errorMessage) {
      errorMessage = errorContent.cloneNode(true);
      errorMessage.querySelector('.error__button').addEventListener('click', function () {
        errorMessage.classList.add('hidden');
        showPins();
      });
    }
    errorMessage.querySelector('.error__message').textContent = errorText;
    errorMessage.classList.remove('hidden');

    window.data.map.appendChild(errorMessage);
  };

  var showPins = function () {
    window.backend.load(onLoad, onError);
  };

  window.pin = {
    mainPin: mainPin,
    showPins: showPins
  };

})();
