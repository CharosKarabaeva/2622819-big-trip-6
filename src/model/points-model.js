import points from '../mock/points.js';
import destinations from '../mock/destinations.js';
import offers from '../mock/offers.js';

export default class PointsModel {
  getPoints() {
    return points;
  }

  getDestinations() {
    return destinations;
  }

  getOffers() {
    return offers;
  }
}
