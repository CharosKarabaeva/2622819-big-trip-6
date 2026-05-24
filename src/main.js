import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointPresenter from './presenter/new-point-presenter.js';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(
  pointsModel,
  filterModel
);

const newPointPresenter = new NewPointPresenter(
  document.querySelector('.trip-events__list'),
  pointsModel,
  pointsModel.getDestinations(),
  pointsModel.getOffers(),
  mainPresenter
);

const filterPresenter = new FilterPresenter(
  document.querySelector('.trip-controls__filters'),
  filterModel,
  () => {
    mainPresenter.currentSortType = 'day';

    mainPresenter.clearPointList();

    newPointPresenter.destroy();

    const oldMessage = mainPresenter.eventsContainer
      .querySelector('.trip-events__msg');

    if (oldMessage) {
      oldMessage.remove();
    }

    if (mainPresenter.filteredPoints.length === 0) {

      mainPresenter.eventsContainer
        .querySelector('.trip-events__list')
        ?.replaceChildren();

      mainPresenter.eventsContainer.insertAdjacentHTML(
        'beforeend',
        `
          <p class="trip-events__msg">
            There are no ${filterModel.getFilter()} events now
          </p>
        `
      );

      return;
    }

    mainPresenter.renderPoints(mainPresenter.filteredPoints);
  }
);

mainPresenter.init();
filterPresenter.init();

document
  .querySelector('.trip-main__event-add-btn')
  .addEventListener('click', () => {

    newPointPresenter.init();
  });
