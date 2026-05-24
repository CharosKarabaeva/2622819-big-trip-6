import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDateTime} from '../utils/format.js';

export default class EditEventView extends AbstractStatefulView {

  constructor(point, destination, offers, destinations) {
    super();

    this._callback = {};

    this._allDestinations = destinations;

    this._state = {
      point,
      destination,
      offers
    };

    this.setFormSubmitHandler = this.setFormSubmitHandler.bind(this);
    this.setRollupClickHandler = this.setRollupClickHandler.bind(this);

    this.setDestinationChangeHandler();
  }

  getOffersTemplate() {
    const offersByType = this._state.offers.find(
      (o) => o.type === this._state.point.type
    );

    if (!offersByType) {
      return '';
    }

    return offersByType.offers.map((offer) => {
      const isChecked = this._state.point.offers.includes(offer.id);

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

  getPicturesTemplate() {
    return this._state.destination.pictures.map((picture) => `
      <img
        class="event__photo"
        src="${picture.src}"
        alt="${picture.description}"
      >
    `).join('');
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;

    this.element.querySelector('form')
      .addEventListener('submit', this._callback.formSubmit);
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this._callback.rollupClick);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this._callback.deleteClick);
  }

  setDestinationChangeHandler() {
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.destinationChangeHandler);
  }

  setTypeChangeHandler() {
    this.element.querySelector('.event__type-select')
      .addEventListener('change', this.typeChangeHandler);
  }

  setPriceInputHandler() {

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', (evt) => {

        evt.target.value = evt.target.value.replace(/\D/g, '');

        this._state.point.basePrice = Number(evt.target.value);
      });
  }

  setDatepicker() {

    flatpickr(
      this.element.querySelector('.event__input--time-start'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        clickOpens: true,
        allowInput: true
      }
    );

    flatpickr(
      this.element.querySelector('.event__input--time-end'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        clickOpens: true,
        allowInput: true
      }
    );
  }

  typeChangeHandler = (evt) => {
    evt.preventDefault();

    this._state.point.type = evt.target.value;
    this._state.point.offers = [];

    this.updateElement(this._state);
  };

  destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this._state.offers
      && this._state.destination
      && evt.target.value;

    if (!selectedDestination) {
      return;
    }

    const foundDestination = this._allDestinations
      ?.find((item) => item.name === evt.target.value);

    if (!foundDestination) {
      return;
    }

    this._state.destination = foundDestination;

    this._state.point.destination = foundDestination.id;

    this.updateElement(this._state);
  };

  get template() {
    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">

          <header class="event__header">

            <div class="event__type-wrapper">

              <label class="event__type event__type-btn">
                <img
                  class="event__type-icon"
                  width="17"
                  height="17"
                  src="img/icons/${this._state.point.type}.png"
                >
              </label>

              <select class="event__type-select">

                <option value="taxi">taxi</option>
                <option value="flight">flight</option>
                <option value="check-in">check-in</option>
                <option value="bus">bus</option>
                <option value="train">train</option>
                <option value="ship">ship</option>

              </select>

            </div>

            <div class="event__field-group event__field-group--destination">
              <label class="event__label event__type-output">
                ${this._state.point.type}
              </label>

              <input
                class="event__input event__input--destination"
                type="text"
                list="destination-list"
                value="${this._state.destination.name}"
              >

              <datalist id="destination-list">
                ${this._allDestinations.map((destination) => `
                  <option value="${destination.name}"></option>
                `).join('')}
              </datalist>
            </div>

            <div class="event__field-group event__field-group--time">

              <input
                class="event__input event__input--time-start"
                type="text"
                value="${formatDateTime(this._state.point.dateFrom)}"
              >

              &mdash;

              <input
                class="event__input event__input--time-end"
                type="text"
                value="${formatDateTime(this._state.point.dateTo)}"
              >

            </div>

            <div class="event__field-group event__field-group--price">

              <label class="event__label">
                &euro;
              </label>

              <input
                class="event__input event__input--price"
                type="text"
                maxlength="9"
                value="${this._state.point.basePrice}"
              >

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
                ${this._state.destination.description}
              </p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${this.getPicturesTemplate()}
                </div>
              </div>

            </section>

          </section>

        </form>
      </li>
    `;
  }

  _restoreHandlers() {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setDestinationChangeHandler();
    this.setTypeChangeHandler();
    this.setPriceInputHandler();
  }
}
