'use strict';

(function () {
  var ALL_OPTIONS_VALUE = 'any';
  var filters = document.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('#housing-type');
  var currentHousingType = ALL_OPTIONS_VALUE;

  var applyFilter = function (adv, filterField, filterValue) {
    var filteredAdv = [];

    for (var i = 0; i < adv.length; i++) {
      if (equals(adv[i].offer[filterField], filterValue) || filterValue === ALL_OPTIONS_VALUE) {
        filteredAdv.push(adv[i]);
      }
      if (filteredAdv.length === window.data.MAX_ADV_COUNT) {
        break;
      }
    }

    return filteredAdv;
  };

  var equals = function (field, value) {
    return field === value;
  };

  window.filter = {
    filters: filters,
    housingTypeFilter: housingTypeFilter,
    currentHousingType: currentHousingType,
    applyFilter: applyFilter
  };

})();
