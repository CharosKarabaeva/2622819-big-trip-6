import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter(pointsModel);

mainPresenter.init();
