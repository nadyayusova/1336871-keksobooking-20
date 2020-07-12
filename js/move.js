'use strict';

(function () {
  var MainPinSize = {
    HALF_WIDTH: 32,
    HEIGHT: 86
  };
  var mainPin = window.data.map.querySelector('.map__pin--main');

  var moveWithBounds = function (currentCoordinate, min, max) {
    return (Math.min(max, Math.max(min, currentCoordinate))) + 'px';
  };

  var mainPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX - window.data.map.offsetLeft,
      y: evt.clientY - window.data.map.offsetTop
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - (moveEvt.clientX - window.data.map.offsetLeft),
        y: startCoords.y - (moveEvt.clientY - window.data.map.offsetTop)
      };

      startCoords = {
        x: moveEvt.clientX - window.data.map.offsetLeft,
        y: moveEvt.clientY - window.data.map.offsetTop
      };

      mainPin.style.top = moveWithBounds(mainPin.offsetTop - shift.y,
          window.data.CoordinateY.LOCATION_MIN_Y,
          window.data.CoordinateY.LOCATION_MAX_Y);

      mainPin.style.left = moveWithBounds(mainPin.offsetLeft - shift.x,
          -MainPinSize.HALF_WIDTH,
          window.data.locationMaxX - MainPinSize.HALF_WIDTH);

      window.form.setAddress(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    mainPinMousedown: mainPinMousedown
  };
})();
