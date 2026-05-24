import points from '../mock/points.js';
import destinations from '../mock/destinations.js';
import offers from '../mock/offers.js';

export default class PointsModel {

  points = points;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return destinations;
  }

  getOffers() {
    return offers;
  }

  updatePoint(updatedPoint) {
    this.points = this.points.map((point) =>
      point.id === updatedPoint.id
        ? updatedPoint
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
