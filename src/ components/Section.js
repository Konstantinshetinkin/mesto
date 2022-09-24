export class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer;
    this._contener = document.querySelector(selectorContainer);
  }
  renderItems(items) {
    let itemsFromServer = items.reverse();
    itemsFromServer.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._contener.prepend(element);
  }
}
