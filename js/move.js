'use strict';

(function () {
  var MainPinSize = {
    HALF_WIDTH: 20,
    HALF_HEIGHT: 22
  };
  var mainPin = window.data.map.querySelector('.map__pin--main');

  var moveWithBounds = function (currentCoordinate, shift, min, max) {
    if (currentCoordinate - shift > max) {
      return max + 'px';
    } else if (currentCoordinate - shift < min) {
      return min + 'px';
    } else {
      return (currentCoordinate - shift) + 'px';
    }
  };

  var mainPinMousedown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = moveWithBounds(mainPin.offsetTop, shift.y,
          window.data.CoordinateY.LOCATION_MIN_Y - MainPinSize.HALF_HEIGHT,
          window.data.CoordinateY.LOCATION_MAX_Y);

      mainPin.style.left = moveWithBounds(mainPin.offsetLeft, shift.x,
          -MainPinSize.HALF_WIDTH,
          window.data.locationMaxX - MainPinSize.HALF_WIDTH);

      window.form.setAddress(false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.move = {
    mainPinMousedown: mainPinMousedown
  };
})();
