'use strict';

(function () {
  var currentWindow;
  var currentMessageButton;
  var currentButtonHandler;

  var showMessage = function (messageWindow, messageButton, buttonPressHandler) {
    currentWindow = messageWindow;
    currentWindow.classList.remove('hidden');
    document.addEventListener('keydown', onMessageEscapePress);
    document.addEventListener('click', onMessageClick);
    if (messageButton && buttonPressHandler) {
      currentMessageButton = messageButton;
      currentButtonHandler = buttonPressHandler;
    }
  };

  var hideMessage = function () {
    if (!currentWindow.classList.contains('hidden')) {
      currentWindow.classList.add('hidden');
      document.removeEventListener('keydown', onMessageEscapePress);
      document.removeEventListener('click', onMessageClick);
      if (currentMessageButton && currentButtonHandler) {
        currentMessageButton.removeEventListener('click', currentButtonHandler);
      }
    }
  };

  var onMessageEscapePress = function (evtKey) {
    if (evtKey.key === 'Escape') {
      evtKey.preventDefault();
      hideMessage(currentWindow);
    }
  };

  var onMessageClick = function () {
    hideMessage(currentWindow);
  };

  window.message = {
    showMessage: showMessage,
    hideMessage: hideMessage
  };

})();
