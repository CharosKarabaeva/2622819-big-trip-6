import PointAdapter from '../adapter/point-adapter.js';

export default class PointsModel {

  constructor(api) {

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
  }

  addPoint(newPoint) {
    this.points = [
      newPoint,
      ...this.points
    ];
  }

  deletePoint(pointToDelete) {
    this.points = this.points.filter(
      (point) => point.id !== pointToDelete.id
    );
  }
}
