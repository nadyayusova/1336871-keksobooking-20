'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewSize = {
    PREVIEW_WIDTH: 70,
    PREVIEW_HEIGHT: 70
  };
  var PREVIEW_ALT = 'Фото жилья';

  var avararFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoFileChooser = document.querySelector('.ad-form__input');
  var allPhotos = document.querySelector('.ad-form__photo-container');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');

  var matches = function (str) {
    return FILE_TYPES.some(function (it) {
      return str.endsWith(it);
    });
  };

  avararFileChooser.addEventListener('change', function () {
    var file = avararFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    if (matches(fileName)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoFileChooser.addEventListener('change', function () {
    var filesArray = Array.from(photoFileChooser.files);

    filesArray.forEach(function (file) {
      var fileName = file.name.toLowerCase();

      if (matches(fileName)) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var img = document.createElement('img');
          img.src = reader.result;
          img.width = previewSize.PREVIEW_WIDTH;
          img.height = previewSize.PREVIEW_HEIGHT;
          img.alt = PREVIEW_ALT;
          if (photoPreviewContainer.children.length === 0) {
            photoPreviewContainer.appendChild(img);
          } else {
            allPhotos.appendChild(photoPreviewContainer.cloneNode(false)).appendChild(img);
          }
        });

        reader.readAsDataURL(file);
      }
    });
  });
})();
