import AbstractView from '../framework/view/abstract-view.js';
import {formatDateTime} from '../utils/format.js';

export default class EditEventView extends AbstractView {

  constructor(point, destination, offers) {
    super();
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getOffersTemplate() {
    const offersByType = this.offers.find((o) => o.type === this.point.type);

    if (!offersByType) {
      return '';
    }

    return offersByType.offers.map((offer) => {
      const isChecked = this.point.offers.includes(offer.id);

      return `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden"
            id="offer-${offer.id}"
            type="checkbox"
            ${isChecked ? 'checked' : ''}>
          <label class="event__offer-label" for="offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `;
    }).join('');
  }

  setFormSubmitHandler(callback) {
    this.element.querySelector('form')
      .addEventListener('submit', callback);
  }

  setRollupClickHandler(callback) {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', callback);
  }

  get template() {
    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">

          <header class="event__header">

            <div class="event__type-wrapper">
              <label class="event__type event__type-btn">
                <img class="event__type-icon" width="17" height="17"
                  src="img/icons/${this.point.type}.png">
              </label>
            </div>

            <div class="event__field-group event__field-group--destination">
              <label class="event__label event__type-output">
                ${this.point.type}
              </label>
              <input class="event__input event__input--destination"
                type="text"
                value="${this.destination.name}">
            </div>

            <div class="event__field-group event__field-group--time">
              <input class="event__input event__input--time"
                type="text"
                value="${formatDateTime(this.point.dateFrom)}">
              &mdash;
              <input class="event__input event__input--time"
                type="text"
                value="${formatDateTime(this.point.dateTo)}">
            </div>

            <div class="event__field-group event__field-group--price">
              <label class="event__label">
                &euro;
              </label>
              <input class="event__input event__input--price"
                type="text"
                value="${this.point.basePrice}">
            </div>

            <button class="event__save-btn btn btn--blue" type="submit">
              Save
            </button>

            <button class="event__reset-btn" type="reset">
              Delete
            </button>

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>

          </header>

          <section class="event__details">

            <section class="event__section event__section--offers">
              <h3 class="event__section-title event__section-title--offers">
                Offers
              </h3>

              <div class="event__available-offers">
                ${this.getOffersTemplate()}
              </div>
            </section>

            <section class="event__section event__section--destination">
              <h3 class="event__section-title event__section-title--destination">
                Destination
              </h3>

              <p class="event__destination-description">
                ${this.destination.description}
              </p>

            </section>

          </section>

        </form>
      </li>
    `;
  }
}
