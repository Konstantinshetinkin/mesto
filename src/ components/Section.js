export class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer;
    this._contener = document.querySelector(selectorContainer);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItems(element) {
    this._contener.append(element);
  }
  addItem(element) {
    this._contener.prepend(element);
  }
}
