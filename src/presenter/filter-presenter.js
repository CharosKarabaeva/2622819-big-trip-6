import {render} from '../render.js';

import FilterView from '../view/filter-view.js';

export default class FilterPresenter {

  constructor(container, filterModel, onFilterChange) {

    this.container = container;
    this.filterModel = filterModel;
    this.onFilterChange = onFilterChange;
  }

  init() {

    const filterComponent = new FilterView(
      this.handleFilterTypeChange
    );

    render(filterComponent, this.container);
  }

  handleFilterTypeChange = (filterType) => {

    this.filterModel.setFilter(filterType);

    this.onFilterChange();
  };
}
