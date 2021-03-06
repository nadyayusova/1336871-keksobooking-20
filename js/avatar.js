'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_ALT = 'Фото жилья';
  var PreviewSize = {
    PREVIEW_WIDTH: 70,
    PREVIEW_HEIGHT: 70
  };

  var avararFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__input');
  var allPhotos = document.querySelector('.ad-form__photo-container');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');

  var isOneOfTypes = function (text) {
    return FILE_TYPES.some(function (it) {
      return text.endsWith(it);
    });
  };

  var loadFile = function (evt, eventHandler) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    if (isOneOfTypes(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', eventHandler.bind(null, reader));
      reader.readAsDataURL(file);
    }
  };

  avararFileChooser.addEventListener('change', function (evt) {
    var onAvatarLoad = function (fileReader) {
      avatarPreview.src = fileReader.result;
    };

    loadFile(evt, onAvatarLoad);
  });

  photoFileChooser.addEventListener('change', function (evt) {
    var onHousingPreviewLoad = function (fileReader) {
      var img = document.createElement('img');
      img.src = fileReader.result;
      img.width = PreviewSize.PREVIEW_WIDTH;
      img.height = PreviewSize.PREVIEW_HEIGHT;
      img.alt = PREVIEW_ALT;
      if (photoPreviewContainer.children.length === 0) {
        photoPreviewContainer.appendChild(img);
      } else {
        allPhotos.appendChild(photoPreviewContainer.cloneNode(false)).appendChild(img);
      }
    };

    loadFile(evt, onHousingPreviewLoad);
  });

})();
