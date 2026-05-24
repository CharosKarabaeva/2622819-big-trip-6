import AbstractView from '../framework/view/abstract-view.js';

const emptyListText = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now'
};

export default class NoPointsView extends AbstractView {

  constructor(filterType) {
    super();

    this.filterType = filterType;
  }

  get template() {
    return `
      <p class="trip-events__msg">
        ${emptyListText[this.filterType]}
      </p>
    `;
  }
}
