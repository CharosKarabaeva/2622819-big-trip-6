import AbstractView from '../framework/view/abstract-view.js';
import {formatDate, formatTime, formatDuration} from '../utils/format.js';

export default class EventView extends AbstractView {

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

    const selectedOffers = offersByType.offers.filter((offer) =>
      this.point.offers.includes(offer.id)
    );

    return selectedOffers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `).join('');
  }

  setRollupClickHandler(callback) {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', callback);
  }

  get template() {
    return `
      <li class="trip-events__item">
        <div class="event">

          <time class="event__date">
            ${formatDate(this.point.dateFrom)}
          </time>

          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this.point.type}.png">
          </div>

          <h3 class="event__title">
            ${this.point.type} ${this.destination.name}
          </h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time">
                ${formatTime(this.point.dateFrom)}
              </time>
              &mdash;
              <time class="event__end-time">
                ${formatTime(this.point.dateTo)}
              </time>
            </p>
            <p class="event__duration">
              ${formatDuration(this.point.dateFrom, this.point.dateTo)}
            </p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this.point.basePrice}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this.getOffersTemplate()}
          </ul>

          <button class="event__favorite-btn ${this.point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28">
              <use xlink:href="img/sprite.svg#favorite"></use>
            </svg>
          </button>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>

        </div>
      </li>
    `;
  }
}
