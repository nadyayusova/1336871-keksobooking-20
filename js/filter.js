'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('#housing-type');
  var currentHousingType = 'any';

  var applyFilter = function (adv, filterField, filterValue) {
    var filteredAdv = adv;

    if (filterValue !== 'any') {
      filteredAdv = adv.filter(function (it) {
        return it.offer[filterField] === filterValue;
      });
    }

    return filteredAdv;
  };

  window.filter = {
    filters: filters,
    housingTypeFilter: housingTypeFilter,
    currentHousingType: currentHousingType,
    applyFilter: applyFilter
  };

})();
