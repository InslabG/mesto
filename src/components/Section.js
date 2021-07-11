export default class Section {
    constructor(renderData, containerSelector) {
        this._renderer = renderData.renderer;
        this._containerSelector = containerSelector;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        if(element){
            this._container.prepend(element);
        }
    }

    renderItems(renderItems) {
        if(renderItems && renderItems.length > 0){
            renderItems.forEach((item) => {
                this._container.append(this._renderer(item));
            });
        }
    }
}