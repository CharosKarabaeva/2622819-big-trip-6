import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventView extends AbstractView {

  get template() {
    return `
      <form class="trip-events__item trip-events__item--new event event--edit" action="#" method="post">
        <h3>New event</h3>
      </form>
    `;
  }
}
