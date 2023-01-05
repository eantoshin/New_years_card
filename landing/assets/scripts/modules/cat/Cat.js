import { showTooltip } from '../showTooltip';

import { setCatSceneData } from '../../actions';

import { MAIN_TOOLTIP_TEXT, CAT_TOOLTIP_TEXT } from '../../constants/tooltipText';
import { MAX, PROGRESS_BAR_PARTS_COUNT } from '../../constants/progressBar';

import { getProgressBarCurrentStep, getSceneProgressMaxValue } from '../../helpers/progressBar';
import { addInteractiveElement, removeInteractiveElement } from '../../helpers/interactiveElement';
import { showFinalModal } from '../../helpers/showFinalModal';
import { showDecorationsAfterCatScene } from '../../helpers/showDecorations';
import { throttle } from '../../helpers/throttle';

import CatZoomAction from './CatZoomAction';
import { ENTITY_CAT_HOVER_ID, ENTITY_CAT_ID, SCENE_STEPS } from './constants';
import { addMittenCursor, resetMittenCursor } from './helpers';

class Cat {
    #store;
    #entityElementHover;
    #entityElement;
    #zoomClass;
    #progressBar;
    #progressBarStartValue;
    #progressBarCurrentStep;
    #progressMaxValue;
    // #isOpenedScene = false;
    #isDone = false;

    constructor(store, progressBar) {
        this.#store = store;
        this.#entityElementHover = document.getElementById(ENTITY_CAT_HOVER_ID);
        this.#entityElement = document.getElementById(ENTITY_CAT_ID);

        this.#zoomClass = new CatZoomAction(this.#entityElement);
        this.#progressBar = progressBar;
    }

    #entityMainAction() {
        this.#entityElementHover.style.display = 'none';

        if (!this.#isDone) {
            this.#zoomToEntity();
        }
    }

    #zoomToEntity() {
        // TODO: работать только со сторой
        // this.#isOpenedScene = true;
        this.#store.dispatch(setCatSceneData({
            isActive: true,
        }));

        this.#zoomClass.zoomToCat();

        this.#zoomClass.interactWithAdditionalBlocksWhileOpeningScene();

        showTooltip({ text: CAT_TOOLTIP_TEXT, store: this.#store });

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

        addMittenCursor();
    }

    #resetZoom() {
        resetMittenCursor();

        this.#zoomClass.resetCatZoom();

        this.#zoomClass.interactWithAdditionalBlocksWhileClosingScene();

        // TODO: работать только со сторой
        // this.#isOpenedScene = false;
        this.#store.dispatch(setCatSceneData({
            isActive: false,
        }));

        showTooltip({ text: MAIN_TOOLTIP_TEXT, hidden: true, store: this.#store });
    }

    #petCat() {
        let currentProgress = this.#progressBar.getProgressBarValue;

        if (currentProgress < this.#progressMaxValue && !this.#isDone) {
            this.#progressBar.increaseByOneUnit();
            this.#progressBar.setProgressBarViewLine();
            currentProgress = this.#progressBar.getProgressBarValue;

            if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep * 3)) {
                addInteractiveElement('#cat-mittens');
                addInteractiveElement('#cat-eyes');
                removeInteractiveElement('#cat-eyes-closed');
            } else if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep * 2)) {
                addInteractiveElement('#cat-scarf');
            } else if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep * 1)) {
                addInteractiveElement('#cat-hat');
            }

            if (currentProgress >= this.#progressMaxValue) {
                this.#isDone = true;

                this.#store.dispatch(setCatSceneData({
                    isDone: true,
                }));
            }
        }

        if (this.#isDone) {
            setTimeout(() => {
                this.#resetZoom();
                showDecorationsAfterCatScene(this.#store);
                showFinalModal(this.#store);
            }, 2000);
        }
    }

    #throttledPetCat = throttle(this.#petCatHandler.bind(this), 500);

    #boundRemoveListeners = this.#removeListeners.bind(this);

    #boundRemoveMobileListeners = this.#removeMobileListeners.bind(this);

    #petCatHandler() {
        if (!this.#isDone) {
            this.#petCat();
        }
    }

    #removeListeners() {
        window.removeEventListener('pointermove', this.#throttledPetCat);
        window.removeEventListener('pointerup', this.#boundRemoveListeners);
    }

    #removeMobileListeners() {
        window.removeEventListener('touchmove', this.#throttledPetCat);
        window.removeEventListener('touchend', this.#boundRemoveMobileListeners);
    }

    #petCatListeners(isMobile, event) {
        event.stopPropagation();
        event.preventDefault();

        if (isMobile) {
            window.addEventListener('touchmove', this.#throttledPetCat);
            window.addEventListener('touchend', this.#boundRemoveMobileListeners);
        } else {
            window.addEventListener('pointermove', this.#throttledPetCat);
            window.addEventListener('pointerup', this.#boundRemoveListeners);
        }
    }

    initEntity() {
        this.#entityElement.addEventListener('pointerdown', this.#petCatListeners.bind(this, false));
        this.#entityElement.addEventListener('touchstart', this.#petCatListeners.bind(this, true));

        // const element = this.#entityElement.getBoundingClientRect();
        // const windowParams = {
        //     innerHeight: window.innerHeight,
        //     innerWidth: window.innerWidth,
        // };

        // window.addEventListener('resize', () => { this.#zoomClass.resizeEntity(element, windowParams); });

        this.#entityElementHover.addEventListener('click', () => this.#entityMainAction());
    }
}

export default Cat;
