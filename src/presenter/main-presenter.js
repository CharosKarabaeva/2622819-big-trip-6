import {render, RenderPosition} from '../render.js';

import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import NoPointsView from '../view/no-points-view.js';

import PointsModel from '../model/points-model.js';
import PointPresenter from './point-presenter.js';

export default class MainPresenter {

  constructor() {
    this.pointsModel = new PointsModel();

    this.pointPresenters = new Map();
  }

  init() {
    const filterContainer = document.querySelector('.trip-controls__filters');
    const eventsContainer = document.querySelector('.trip-events');
    const eventsListContainer = document.querySelector('.trip-events__list');

    const points = this.pointsModel.getPoints();
    const destinations = this.pointsModel.getDestinations();
    const offers = this.pointsModel.getOffers();

    const now = new Date();

    const filters = {
      everything: {
        isChecked: true
      },
      future: {
        isDisabled: !points.some((p) => new Date(p.dateFrom) > now)
      },
      present: {
        isDisabled: !points.some((p) =>
          new Date(p.dateFrom) <= now &&
          new Date(p.dateTo) >= now
        )
      },
      past: {
        isDisabled: !points.some((p) => new Date(p.dateTo) < now)
      }
    };

    render(new FilterView(filters), filterContainer);
    render(new SortView(), eventsContainer, RenderPosition.AFTERBEGIN);

    if (points.length === 0) {
      render(new NoPointsView(), eventsContainer);
      return;
    }

    points.forEach((point) => {
      const destination = destinations.find((d) => d.id === point.destination);

      const pointPresenter = new PointPresenter(
        eventsListContainer,
        point,
        destination,
        offers,
        this.handleModeChange
      );

      pointPresenter.init();

      this.pointPresenters.set(point.id, pointPresenter);
    });
  }

  handleModeChange = () => {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
