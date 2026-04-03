import {createElement} from '../render.js';

export default class NewEventView {

  getTemplate() {
    return `
      <form class="trip-events__item trip-events__item--new event event--edit" action="#" method="post">
        <h3>New event</h3>
      </form>
    `;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
