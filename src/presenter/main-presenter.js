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

    this.currentSortType = 'day';
  }

  init() {
    this.filterContainer = document.querySelector('.trip-controls__filters');
    this.eventsContainer = document.querySelector('.trip-events');
    this.eventsListContainer = document.querySelector('.trip-events__list');

    this.points = this.pointsModel.getPoints();
    this.destinations = this.pointsModel.getDestinations();
    this.offers = this.pointsModel.getOffers();

    const now = new Date();

    const filters = {
      everything: {
        isChecked: true
      },
      future: {
        isDisabled: !this.points.some((p) => new Date(p.dateFrom) > now)
      },
      present: {
        isDisabled: !this.points.some((p) =>
          new Date(p.dateFrom) <= now &&
          new Date(p.dateTo) >= now
        )
      },
      past: {
        isDisabled: !this.points.some((p) => new Date(p.dateTo) < now)
      }
    };

    render(new FilterView(filters), this.filterContainer);

    render(
      new SortView(this.handleSortTypeChange),
      this.eventsContainer,
      RenderPosition.AFTERBEGIN
    );

    if (this.points.length === 0) {
      render(new NoPointsView(), this.eventsContainer);
      return;
    }

    this.renderPoints(this.points);
  }

  renderPoints(points) {

    points.forEach((point) => {
      const destination = this.destinations.find((d) => d.id === point.destination);

      const pointPresenter = new PointPresenter(
        this.eventsListContainer,
        point,
        destination,
        this.offers,
        this.handleModeChange
      );

      pointPresenter.init();

      this.pointPresenters.set(point.id, pointPresenter);
    });
  }

  handleModeChange = () => {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  };

  clearPointList() {
    this.pointPresenters.forEach((presenter) => presenter.destroy());

    this.pointPresenters.clear();
  }

  handleSortTypeChange = (sortType) => {

    if (this.currentSortType === sortType) {
      return;
    }

    this.currentSortType = sortType;

    this.clearPointList();

    const sortedPoints = [...this.points];

    switch (sortType) {
      case 'time':
        sortedPoints.sort((a, b) => {
          const durationA = new Date(a.dateTo) - new Date(a.dateFrom);
          const durationB = new Date(b.dateTo) - new Date(b.dateFrom);

          return durationB - durationA;
        });
        break;

      case 'price':
        sortedPoints.sort((a, b) => b.basePrice - a.basePrice);
        break;

      default:
        sortedPoints.sort((a, b) =>
          new Date(a.dateFrom) - new Date(b.dateFrom)
        );
    }

    this.renderPoints(sortedPoints);
  };
}
