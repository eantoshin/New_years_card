import Paints from '../paints/Paints';
import { showTooltip } from '../showTooltip';

import { setGingerbreadSceneData } from '../../actions';

import { MAIN_TOOLTIP_TEXT, GINGERBREAD_TOOLTIP_TEXT } from '../../constants/tooltipText';
import { MAX, PROGRESS_BAR_PARTS_COUNT } from '../../constants/progressBar';

import { getProgressBarCurrentStep, getSceneProgressMaxValue } from '../../helpers/progressBar';
import { showFinalModal } from '../../helpers/showFinalModal';
import { showDecorationsAfterGingerbreadScene } from '../../helpers/showDecorations';

import {
    colors,
    ENTITY_GINGERBREAD_HOVER_ID,
    ENTITY_GINGERBREAD_ID,
    SCENE_STEPS,
} from './constants';
import { addPaintBrushCursor, resetPaintBrushCursor } from './helpers';
import GingerbreadZoomAction from './GingerbreadZoomAction';

class Gingerbread {
    #store;
    #entityElementHover;
    #entityElement;
    #paints;
    #zoomClass;
    #progressBar;
    #progressBarStartValue;
    #progressBarCurrentStep;
    #progressMaxValue;
    #isOpenedScene = false;
    #isDone = false;

    constructor(store, progressBar) {
        this.#store = store;
        this.#entityElementHover = document.getElementById(ENTITY_GINGERBREAD_HOVER_ID);
        this.#entityElement = document.getElementById(ENTITY_GINGERBREAD_ID);

        this.#zoomClass = new GingerbreadZoomAction(this.#entityElement);
        this.#progressBar = progressBar;
        this.#paints = new Paints();
    }

    #entityMainAction(event) {
        event.stopPropagation();

        this.#entityElementHover.style.display = 'none';

        if (!this.#isDone) {
            if (!this.#isOpenedScene) {
                this.#zoomToEntity();
            }
        }
    }

    #zoomToEntity() {
        this.#isOpenedScene = true;
        this.#store.dispatch(setGingerbreadSceneData({
            isActive: true,
        }));

        this.#zoomClass.zoomToGingerbread();

        this.#zoomClass.interactWithAdditionalBlocksWhileOpeningScene();

        showTooltip({ text: GINGERBREAD_TOOLTIP_TEXT, store: this.#store });

        if (!this.#isDone) {
            this.#progressBarStartValue = this.#progressBar.getProgressBarValue;
            this.#progressMaxValue = getSceneProgressMaxValue(
                MAX,
                PROGRESS_BAR_PARTS_COUNT,
                this.#progressBarStartValue,
            );
            this.#progressBarCurrentStep = getProgressBarCurrentStep(MAX, PROGRESS_BAR_PARTS_COUNT, SCENE_STEPS);
            this.#progressBar.updateProgressBarStep(this.#progressBarCurrentStep);
        }

        addPaintBrushCursor();
    }

    #resetZoom() {
        resetPaintBrushCursor();

        this.#zoomClass.resetGingerbreadZoom();

        this.#zoomClass.interactWithAdditionalBlocksWhileClosingScene();

        this.#isOpenedScene = false;
        this.#store.dispatch(setGingerbreadSceneData({
            isActive: false,
        }));

        showTooltip({ text: MAIN_TOOLTIP_TEXT, hidden: true, store: this.#store });
    }

    // TODO: для окраски несколькими цветами нужна следующая структура
    // TODO: унести куда-нибудь
    #paint = {
        roof: {
            colors: [],
            elements: [
                [ '#roof-attic-snowflakes path' ],
                [ '#roof-snowflakes path' ],
            ],
            currentElementIndex: 0,
            painted: false,
        },
        wood: {
            colors: [],
            elements: [
                [ '#wood-snow-cap path', '#wood-trunk-first-color path' ],
                [ '#wood-trunk-second-color path' ],
            ],
            currentElementIndex: 0,
            painted: false,
        },
        doorjamb: {
            colors: [],
            elements: [
                [ '#doorjamb-facade path' ],
            ],
            currentElementIndex: 0,
            painted: false,
        },
    }

    #housePartPainting(housePartName) {
        const currentColor = colors[this.#paints.currentColor];
        const currentHouseElement = this.#paint[housePartName];

        // TODO: isDone перенести в другое место
        if (currentColor && !this.#isDone) {
            const elementsSelectors = currentHouseElement.elements[currentHouseElement.currentElementIndex];
            elementsSelectors.forEach((selector) => {
                const paths = document.querySelectorAll(selector);

                paths.forEach((path) => {
                    path.setAttribute('fill', currentColor);
                });

                currentHouseElement.colors[currentHouseElement.currentElementIndex] = currentColor;
            });

            if (!currentHouseElement.painted) {
                this.#housePainting();
            }

            if (currentHouseElement.currentElementIndex + 1 >= currentHouseElement.elements.length) {
                currentHouseElement.currentElementIndex = 0;
                currentHouseElement.painted = true;
            } else {
                currentHouseElement.currentElementIndex = currentHouseElement.currentElementIndex + 1;
            }
        }
    }

    #initHousePainting() {
        const doorjamb = document.getElementById('doorjamb-facade');
        const wood = document.getElementById('wood');
        const roof = document.getElementById('roof');

        doorjamb.addEventListener('click', this.#housePartPainting.bind(this, 'doorjamb'));
        wood.addEventListener('click', this.#housePartPainting.bind(this, 'wood'));
        roof.addEventListener('click', this.#housePartPainting.bind(this, 'roof'));
    }

    #housePainting() {
        let currentProgress = this.#progressBar.getProgressBarValue;

        if (currentProgress < this.#progressMaxValue && !this.#isDone) {
            this.#progressBar.increaseByOneUnit();
            this.#progressBar.setProgressBarViewLine();
            currentProgress = this.#progressBar.getProgressBarValue;

            if (currentProgress >= this.#progressMaxValue) {
                this.#isDone = true;

                this.#store.dispatch(setGingerbreadSceneData({
                    isDone: true,
                }));
            }
        }

        if (this.#isDone) {
            setTimeout(() => {
                this.#resetZoom();
                showDecorationsAfterGingerbreadScene(this.#store);
                showFinalModal(this.#store);
            }, 2000);
        }
    }

    initEntity() {
        this.#paints.init();
        this.#initHousePainting();
        this.#entityElementHover.addEventListener('click', (e) => this.#entityMainAction(e));
        this.#entityElement.addEventListener('click', (e) => this.#entityMainAction(e));
    }
}

export default Gingerbread;
