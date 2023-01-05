import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../../constants/breakpoints';
import DOMElements from '../screen/DOMElements';
import PanzoomUtil from '../panzoom';

class CatZoomAction {
    #elements;
    #entityElement;

    constructor(entityElement) {
        this.#entityElement = entityElement;
        this.#elements = new DOMElements();
    }

    interactWithAdditionalBlocksWhileOpeningScene() {
        this.#elements.showProgressBar();

        setTimeout(() => {
            this.#elements.showPrompt();
        }, 200);

        this.#elements.hideAudioButton();
        this.#elements.hideHeader();
    }

    interactWithAdditionalBlocksWhileClosingScene() {
        this.#elements.hideProgressBar();
        this.#elements.showAudioButton();
        this.#elements.showHeader();
    }

    zoomToCat() {
        const panzoomInstance = PanzoomUtil.getInstance();

        const windowInnerWidth = window.innerWidth;
        let scale = 5;

        if (windowInnerWidth <= MOBILE_BREAKPOINT) {
            scale = 2.2;
        } else if (windowInnerWidth <= TABLET_BREAKPOINT) {
            scale = 3;
        }

        panzoomInstance.zoomToElement(scale, this.#entityElement, {});

        setTimeout(() => {
            this.#elements.hidePrompt();
        }, 3000);
    }

    // resizeEntity(element, windowParams, customOffsets = {}) {
    //     const panzoom = PanzoomUtil.getInstance().panzoom;

    //     console.log('resizeEntity');

    //     const {
    //         top,
    //         left,
    //         height,
    //         width,
    //     } = element;

    //     const {
    //         innerHeight: oldInnerHeight,
    //         innerWidth: oldInnerWidth,
    //     } = windowParams;

    //     const {
    //         x = 0,
    //         y = 0,
    //     } = customOffsets;

    //     const {
    //         top: entityTop,
    //         left: entityLeft,
    //         height: entityHeight,
    //         width: entityWidth,
    //     } = this.#entityElement.getBoundingClientRect();

    //     const scale = 5;

    //     const windowWidth = window.innerWidth;
    //     const windowHeight = window.innerHeight;

    //     const xWidth = (windowWidth - entityWidth) / 2 / scale;

    //     // TODO: попробовать проверить, что если смещение выходит за рамки экрана,
    //     // то смещать svg только до края, а не за край

    //     const xOffset = left - (((oldInnerWidth - width * scale) / 2) / scale);
    //     const yOffset = top - (((oldInnerHeight - height * scale) / 2) / scale);

    //     const widthOffset = ((windowWidth - width * scale) / 2) / scale;
    //     const heightOffset = ((windowHeight - height * scale) / 2) / scale;

    //     const widthDelta = (oldInnerWidth - windowWidth) / scale;
    //     const heightDelta = (oldInnerHeight - windowHeight) / scale;

    //     // const oldXOffset = xOffset;
    //     // const oldYOffset = yOffset;
    //     const oldXOffset = left - widthOffset;
    //     const oldYOffset = top - heightOffset;
    //     const newXOffset = xOffset - widthDelta - xWidth;
    //     const newYOffset = yOffset - heightDelta;

    //     // TODO: скорее всего, нужно ещё добавить расчет текущей ширины как-то

    //     console.log('windowParams', windowParams);
    //     console.log('windowWidth', windowWidth);
    //     console.log('windowHeight', windowHeight);
    //     // console.log('oldXOffset', oldXOffset);
    //     // console.log('oldYOffset', oldYOffset);
    //     console.log('newXOffset', newXOffset);
    //     console.log('newYOffset', newYOffset);

    //     panzoom.pan(-newXOffset, -newYOffset, {
    //         force: true,
    //     });
    //     // panzoom.zoom(scale);

    //     // TODO: возможно запоминать старые координаты
    //     // Получать новые
    //     // Вычислять разницу
    //     // Сдвигать
    //     // А потом перезаписывать старые координаты на новые

    //     // Запоминать изначальные координаты
    //     //

    //     // Смотреть на разницу в старой ширине/высоте экрана и в новой

    //     //*
    //     // !!!! Запоминать начальный xOffset
    //     // Начальную ширину экрана innerWidth
    //     // И из xOffset вычитать разницу старого innerWidth и нового и делить на scale
    // }

    // Сначала взять начальный полный чистый left без каких либо смещений
    // Затем попробовать отнимать/прибавлять к left разницу между шириной экрана
    // Следующим шагом попробовать добавить отступ слева на половину ширины экрана

    resetCatZoom() {
        const panzoom = PanzoomUtil.getInstance().panzoom;

        panzoom.reset();
    }
}

export default CatZoomAction;
