import {render, replace} from '../framework/render.js';

import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';

export default class PointPresenter {

  constructor(container, point, destination, offers, onModeChange) {
    this.container = container;
    this.point = point;
    this.destination = destination;
    this.offers = offers;
    this.onModeChange = onModeChange;

    this.eventComponent = null;
    this.editComponent = null;
  }

  init() {

    const prevEventComponent = this.eventComponent;
    const prevEditComponent = this.editComponent;

    this.eventComponent = new EventView(
      this.point,
      this.destination,
      this.offers
    );

    this.editComponent = new EditEventView(
      this.point,
      this.destination,
      this.offers
    );

    this.eventComponent.setRollupClickHandler(() => {

      this.onModeChange();

      this.replaceEventToEdit();

      document.addEventListener('keydown', this.escKeyDownHandler);
    });

    this.eventComponent.setFavoriteClickHandler(() => {
      this.point.isFavorite = !this.point.isFavorite;
      this.init();
    });

    this.editComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this.replaceEditToEvent();
    });

    this.editComponent.setRollupClickHandler(() => {
      this.replaceEditToEvent();
    });

    if (prevEventComponent === null || prevEditComponent === null) {
      render(this.eventComponent, this.container);
      return;
    }

    replace(this.eventComponent, prevEventComponent);

    if (document.body.contains(prevEditComponent.element)) {
      replace(this.editComponent, prevEditComponent);
    }
  }

  replaceEventToEdit() {
    replace(this.editComponent, this.eventComponent);
  }

  replaceEditToEvent() {
    replace(this.eventComponent, this.editComponent);

    document.removeEventListener('keydown', this.escKeyDownHandler);
  }

  resetView() {

    if (document.body.contains(this.editComponent.element)) {
      this.replaceEditToEvent();
    }
  }

  escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.replaceEditToEvent();

      document.removeEventListener('keydown', this.escKeyDownHandler);
    }
  };
}

