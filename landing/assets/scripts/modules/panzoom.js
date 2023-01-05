import Panzoom from '@panzoom/panzoom';

class PanzoomUtil {
    // Singleton
    // TODO: при первом вызове инициализируем
    // А далее, если обращается к классу, то вызываем уже panzoom - готовый экземпляр библиотечного класса

    static #instance = null;
    #panzoom = null;
    #panzoomElement = null;

    // TODO: ругается на приватный конструктор
    constructor(panzoomElement) {
        // eslint-disable-next-line babel/new-cap
        this.#panzoom = Panzoom(panzoomElement, {
            // TODO: протестировать
            // startScale: 1,
            maxScale: 5,
            animate: true,
            disablePan: true,
            duration: 500,
            origin: '0% 0%',
            handleStartEvent: (event) => {
                event.preventDefault();
            },
            touchAction: '',
        });
        this.#panzoomElement = panzoomElement;
    }

    // TODO: возможно вынести в отдельный класс PanzoomActions
    zoomToElement(scale, element, customOffsets = {}) {
        const {
            top,
            left,
            height,
            width,
        } = element.getBoundingClientRect();

        const {
            x = 0,
            y = 0,
        } = customOffsets;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // TODO: попробовать проверить, что если смещение выходит за рамки экрана,
        // то смещать svg только до края, а не за край

        const xOffset = left - (((windowWidth - width * scale) / 2) / scale) + x;
        const yOffset = top - (((windowHeight - height * scale) / 2) / scale) + y;

        this.#panzoom.pan(-xOffset, -yOffset, {
            force: true,
        });
        this.#panzoom.zoom(scale);
    }

    reset() {
        this.#panzoom.reset();
    }

    get panzoom() {
        return this.#panzoom;
    }

    get panzoomElement() {
        return this.#panzoomElement;
    }

    static getInstance(panzoomElement) {
        // TODO: добавить проверку на наличие elem
        // Если нету ни elem, ни instance, то генерируем ошибку
        if (!this.#instance) {
            this.#instance = new this(panzoomElement);
        }

        return this.#instance;
    }
}

export default PanzoomUtil;
