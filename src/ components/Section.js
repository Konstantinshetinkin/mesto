export class Section{
    constructor({items,renderer},selectorContainer){
        this._renderer = renderer;
        this._contener = document.querySelector(selectorContainer)
    }
    renderItems(items){
        items.forEach((item) => {
            this._renderer(item)
        });
    }
    addItem(element){
        this._contener.prepend(element)
    }
}