'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;
  var MainPinSize = {
    WIDTH: 64,
    HEIGHT: 86
  };
  var mainPin = window.data.map.querySelector('.map__pin--main');
  var minY = window.data.CoordinateY.LOCATION_MIN_Y - MainPinSize.HEIGHT;
  var maxY = window.data.CoordinateY.LOCATION_MAX_Y - PIN_POINTER_HEIGHT;

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

      if (startCoords.y >= minY && moveEvt.pageY <= maxY &&
          startCoords.x >= window.data.LOCATION_MIN_X &&
          startCoords.x <= window.data.locationMaxX) {
        mainPin.style.top = moveWithBounds(mainPin.offsetTop - shift.y,
            window.data.CoordinateY.LOCATION_MIN_Y - MainPinSize.HEIGHT,
            window.data.CoordinateY.LOCATION_MAX_Y - MainPinSize.HEIGHT);
        mainPin.style.left = moveWithBounds(mainPin.offsetLeft - shift.x,
            window.data.LOCATION_MIN_X,
            window.data.locationMaxX - MainPinSize.WIDTH);
      }

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
