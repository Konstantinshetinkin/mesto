export class Section{
    constructor({items,renderer},selectorContainer){
        this._rendererItems = items;
        this._renderer = renderer;
        this._contener = document.querySelector(selectorContainer)
    }
    renderItem(){
        this._rendererItems.forEach((item) => {
            this._renderer(item)
        });
    }
    addItem(element){
        this._contener.prepend(element)
    }
}