import {render, RenderPosition} from '../render.js';

import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';

import PointsModel from '../model/points-model.js';

export default class MainPresenter {

  constructor() {
    this.pointsModel = new PointsModel();
  }

  init() {
    const filterContainer = document.querySelector('.trip-controls__filters');
    const eventsContainer = document.querySelector('.trip-events');
    const eventsListContainer = document.querySelector('.trip-events__list');

    const points = this.pointsModel.getPoints();
    const destinations = this.pointsModel.getDestinations();
    const offers = this.pointsModel.getOffers();

    render(new FilterView(), filterContainer);
    render(
      new SortView(),
      eventsContainer,
      RenderPosition.AFTERBEGIN
    );

    const firstPoint = points[0];
    const firstDestination = destinations.find((d) => d.id === firstPoint.destination);

    render(new EditEventView(firstPoint, firstDestination, offers), eventsListContainer);

    points.forEach((point) => {
      const destination = destinations.find((d) => d.id === point.destination);
      render(new EventView(point, destination, offers), eventsListContainer);
    });
  }
}
