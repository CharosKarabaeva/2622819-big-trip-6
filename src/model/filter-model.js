export default class FilterModel {

  filter = 'everything';

  getFilter() {
    return this.filter;
  }

  setFilter(updateType) {
    this.filter = updateType;
  }
}
