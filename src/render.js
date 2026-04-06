const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.element);
}

export {RenderPosition, render};
