import { TABLET_BREAKPOINT } from '../../constants/breakpoints';
import DOMElements from '../screen/DOMElements';
import PanzoomUtil from '../panzoom';

class ScarfZoomAction {
    #elements;
    #entityElement;

    constructor(entityElement) {
        this.#entityElement = entityElement;
        this.#elements = new DOMElements();
    }

    interactWithAdditionalBlocksWhileOpeningScene() {
        this.#elements.showProgressBar();
        this.#elements.hideAudioButton();
        this.#elements.hideHeader();
    }

    interactWithAdditionalBlocksWhileClosingScene() {
        this.#elements.hideProgressBar();
        this.#elements.showAudioButton();
        this.#elements.showHeader();
    }

    zoomToScarf() {
        const panzoomInstance = PanzoomUtil.getInstance();

        const windowInnerWidth = window.innerWidth;
        let scale = 5;

        if (windowInnerWidth <= TABLET_BREAKPOINT) {
            scale = 3;
        }

        panzoomInstance.zoomToElement(scale, this.#entityElement, {
            y: -40,
        });
    }

    resetScarfZoom() {
        const panzoom = PanzoomUtil.getInstance().panzoom;

        panzoom.reset();
    }
}

export default ScarfZoomAction;
