import $ from 'jquery';

class Paints {
    #colors = [ '#376733', '#FDC020', '#DE1149', '#6B11DE' ];
    #paintsElements = [];
    #currentColor = null;

    // TODO: либо может в конструктор передать массив с именами цветов
    constructor() {
        // TODO: если элементов нет, то генерируем ошибку
        this.#paintsElements = document.querySelectorAll('.paint-bottle');
    }

    // #setColor(paintIndex) {
    //     this.#currentColor = this.#colors[paintIndex];
    // }
    #setColor(color, event) {
        $(this.#paintsElements).removeClass('paint-bottle__selected');
        $(event.target).addClass('paint-bottle__selected');

        this.#currentColor = color;
    }

    get currentColor() {
        return this.#currentColor;
    }

    init() {
        this.#paintsElements.forEach((paintElement) => {
            const color = paintElement.dataset.color;

            paintElement.addEventListener('click', this.#setColor.bind(this, color));
        });
        // this.#paintsElements.forEach((paintElement, paintIndex) => {
        //     paintElement.addEventListener('click', this.#setColor.bind(this, paintIndex));
        // });
    }
}

export default Paints;
