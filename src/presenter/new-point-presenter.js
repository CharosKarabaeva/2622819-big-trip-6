import {render, remove, RenderPosition} from '../framework/render.js';

import EditEventView from '../view/edit-event-view.js';

export default class NewPointPresenter {

  constructor(
    container,
    pointsModel,
    destinations,
    offers,
    mainPresenter
  ) {

    this.container = container;

    this.pointsModel = pointsModel;

    this.destinations = destinations;
    this.offers = offers;

    this.mainPresenter = mainPresenter;

    this.pointComponent = null;
  }

  init() {

    if (this.pointComponent !== null) {
      return;
    }

    const emptyPoint = {
      point: {
        id: String(Date.now()),
        type: 'taxi',
        destination: '1',
        dateFrom: new Date().toISOString(),
        dateTo: new Date().toISOString(),
        basePrice: 0,
        isFavorite: false,
        offers: []
      },

      destination: this.destinations[0],
      offers: this.offers
    };

    this.pointComponent = new EditEventView(
      emptyPoint.point,
      emptyPoint.destination,
      emptyPoint.offers,
      this.destinations
    );

    render(
      this.pointComponent,
      this.container,
      RenderPosition.AFTERBEGIN
    );

    this.pointComponent.setDatepicker();

    this.pointComponent.setPriceInputHandler();

    this.pointComponent.setRollupClickHandler(() => {
      this.destroy();
    });

    this.pointComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();

      this.pointsModel.addPoint(emptyPoint.point);

      this.mainPresenter.points = this.pointsModel.getPoints();

      this.mainPresenter.clearPointList();

      this.mainPresenter.renderPoints(
        this.mainPresenter.filteredPoints
      );

      this.destroy();
    });
  }

  destroy() {

    if (this.pointComponent === null) {
      return;
    }

    remove(this.pointComponent);

    this.pointComponent = null;
  }
}
