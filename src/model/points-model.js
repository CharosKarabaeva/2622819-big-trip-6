import PointAdapter from '../adapter/point-adapter.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {

  constructor(api) {

    super();

    this.api = api;

    this.points = [];

    this.destinations = [];

    this.offers = [];
  }

  async init() {

    const points = await this.api.points();

    this.points = points.map(PointAdapter.adaptToClient);

    this.destinations = await this.api.destinations();

    this.offers = await this.api.offers();
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  async updatePoint(updatedPoint) {

    const updatedPointResponse = await this.api.updatePoint(
      PointAdapter.adaptToServer(updatedPoint)
    );

    const adaptedPoint = PointAdapter.adaptToClient(
      updatedPointResponse
    );

    this.points = this.points.map((point) =>
      point.id === adaptedPoint.id
        ? adaptedPoint
        : point
    );

    this._notify('UPDATE');
  }

  async addPoint(newPoint) {

    const response = await this.api.addPoint(
      PointAdapter.adaptToServer(newPoint)
    );

    const adaptedPoint = PointAdapter.adaptToClient(
      response
    );

    this.points = [
      adaptedPoint,
      ...this.points
    ];

    this._notify('ADD');
  }

  async deletePoint(pointToDelete) {

    await this.api.deletePoint(pointToDelete);

    this.points = this.points.filter(
      (point) => point.id !== pointToDelete.id
    );

    this._notify('DELETE');
  }
}
