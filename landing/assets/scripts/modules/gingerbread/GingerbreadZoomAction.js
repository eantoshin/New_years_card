import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../../constants/breakpoints';
import DOMElements from '../screen/DOMElements';
import PanzoomUtil from '../panzoom';

class GingerbreadZoomAction {
    #elements;
    #entityElement;

    constructor(entityElement) {
        this.#entityElement = entityElement;
        this.#elements = new DOMElements();
    }

    interactWithAdditionalBlocksWhileOpeningScene() {
        this.#elements.showProgressBar();
        this.#elements.showPaints();
        this.#elements.hideAudioButton();
        this.#elements.hideHeader();
    }

    interactWithAdditionalBlocksWhileClosingScene() {
        this.#elements.hideProgressBar();
        this.#elements.hidePaints();
        this.#elements.showAudioButton();
        this.#elements.showHeader();
    }

    zoomToGingerbread() {
        const panzoomInstance = PanzoomUtil.getInstance();

        const windowInnerWidth = window.innerWidth;
        let scale = 5;
        let y = -30;

        if (windowInnerWidth <= MOBILE_BREAKPOINT) {
            scale = 3;
            y = 0;
        } else if (windowInnerWidth <= TABLET_BREAKPOINT) {
            scale = 4;
        }

        panzoomInstance.zoomToElement(scale, this.#entityElement, {
            y,
        });
    }

    resetGingerbreadZoom() {
        const panzoom = PanzoomUtil.getInstance().panzoom;

        panzoom.reset();
    }
}

export default GingerbreadZoomAction;
