export default class Section {
    constructor(renderData, containerSelector) {
        this._items = renderData.items;
        this._renderer = renderData.renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        if(element){
            this._container.prepend(element);
        }
    }

    renderItems() {
        if(this._items && this._items.length > 0){
            this._items.forEach((item) => {
                this._container.append(this._renderer(item));
            });
        }
    }
}