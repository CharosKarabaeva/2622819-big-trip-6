import {render} from '../render.js';

import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';

export default class MainPresenter {

  init() {
    const filterContainer = document.querySelector('.trip-controls__filters');
    const eventsContainer = document.querySelector('.trip-events');
    const eventsListContainer = document.querySelector('.trip-events__list');

    render(new FilterView(), filterContainer);

    render(new SortView(), eventsContainer);

    render(new EditEventView(), eventsListContainer);
    render(new EventView(), eventsListContainer);
    render(new EventView(), eventsListContainer);
    render(new EventView(), eventsListContainer);
  }
}
