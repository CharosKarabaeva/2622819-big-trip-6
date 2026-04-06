import {render, RenderPosition} from '../render.js';

import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import NoPointsView from '../view/no-points-view.js';

import PointsModel from '../model/points-model.js';

export default class MainPresenter {

  constructor() {
    this.pointsModel = new PointsModel();
    this.activeEditComponent = null;
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

      const eventComponent = new EventView(point, destination, offers);
      const editComponent = new EditEventView(point, destination, offers);

      let escKeyDownHandler;

      const replaceEditToEvent = () => {
        editComponent.element.replaceWith(eventComponent.element);
        document.removeEventListener('keydown', escKeyDownHandler);

        if (this.activeEditComponent === editComponent) {
          this.activeEditComponent = null;
        }
      };

      const replaceEventToEdit = () => {

        if (this.activeEditComponent && this.activeEditComponent !== editComponent) {
          this.activeEditComponent.element.replaceWith(
            this.activeEditComponent._eventComponent.element
          );
        }

        eventComponent.element.replaceWith(editComponent.element);
        this.activeEditComponent = editComponent;

        editComponent._eventComponent = eventComponent;

        escKeyDownHandler = (evt) => {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            replaceEditToEvent();
          }
        };

        document.addEventListener('keydown', escKeyDownHandler);
      };

      eventComponent.setRollupClickHandler(() => {
        replaceEventToEdit();
      });

      editComponent.setFormSubmitHandler((evt) => {
        evt.preventDefault();
        replaceEditToEvent();
      });

      editComponent.setRollupClickHandler(() => {
        replaceEditToEvent();
      });

      render(eventComponent, eventsListContainer);
    });
  }
}
