import { showTooltip } from '../showTooltip';
import { setKnittingSceneData } from '../../actions';

import { MAX, PROGRESS_BAR_PARTS_COUNT } from '../../constants/progressBar';
import { MAIN_TOOLTIP_TEXT, SCARF_TOOLTIP_TEXT } from '../../constants/tooltipText';

import { addInteractiveElement } from '../../helpers/interactiveElement';
import { getProgressBarCurrentStep, getSceneProgressMaxValue } from '../../helpers/progressBar';
import { showFinalModal } from '../../helpers/showFinalModal';
import { showDecorationsAfterKnittingScene } from '../../helpers/showDecorations';

import ScarfAnimation from './ScarfAnimation';
import ScarfZoomAction from './ScarfZoomAction';

import {
    ENTITY_SCARF_HOVER_ID,
    ENTITY_SCARF_ID,
    SCENE_STEPS,
} from './constants';

class Scarf {
    #store;
    #entityElementHover;
    #entityElement;
    #animationClass;
    #zoomClass;
    #progressBar;
    #progressBarStartValue;
    #progressBarCurrentStep;
    #progressMaxValue;
    #isOpenedScene = false;
    #isDone = false;

    constructor(store, progressBar) {
        this.#store = store;
        this.#entityElementHover = document.getElementById(ENTITY_SCARF_HOVER_ID);
        this.#entityElement = document.getElementById(ENTITY_SCARF_ID);

        this.#zoomClass = new ScarfZoomAction(this.#entityElement);
        this.#animationClass = new ScarfAnimation();
        this.#progressBar = progressBar;
    }

    #entityMainAction(event) {
        event.stopPropagation();

        this.#entityElementHover.style.display = 'none';

        if (!this.#isDone) {
            if (this.#isOpenedScene) {
                this.#knittingScarf();
            } else {
                this.#zoomToEntity();
            }
        }
    }

    #zoomToEntity() {
        this.#isOpenedScene = true;
        this.#store.dispatch(setKnittingSceneData({
            isActive: true,
        }));

        this.#zoomClass.zoomToScarf();

        this.#zoomClass.interactWithAdditionalBlocksWhileOpeningScene();

        this.#animationClass.transformKnittingScene();

        showTooltip({ text: SCARF_TOOLTIP_TEXT, store: this.#store });

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
    }

    async #resetZoom() {
        await this.#animationClass.resetTransformKnittingScene();

        this.#zoomClass.resetScarfZoom();

        this.#zoomClass.interactWithAdditionalBlocksWhileClosingScene();

        this.#isOpenedScene = false;
        this.#store.dispatch(setKnittingSceneData({
            isActive: false,
        }));

        showTooltip({ text: MAIN_TOOLTIP_TEXT, hidden: true, store: this.#store });
    }

    #knittingScarf() {
        let currentProgress = this.#progressBar.getProgressBarValue;

        this.#animationClass.transformNeedles();

        if (currentProgress < this.#progressMaxValue && !this.#isDone) {
            this.#progressBar.increaseByOneUnit();
            this.#progressBar.setProgressBarViewLine();
            currentProgress = this.#progressBar.getProgressBarValue;

            if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep * 4)) {
                addInteractiveElement('#scarf-block-5');
            } else if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep * 3)) {
                addInteractiveElement('#scarf-block-4');
            } else if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep * 2)) {
                addInteractiveElement('#scarf-block-3');
            } else if (currentProgress >= (this.#progressBarStartValue + this.#progressBarCurrentStep)) {
                addInteractiveElement('#scarf-block-2');
            }

            if (currentProgress >= this.#progressMaxValue) {
                this.#isDone = true;

                this.#store.dispatch(setKnittingSceneData({
                    isDone: true,
                }));
            }
        }

        if (this.#isDone) {
            this.#isDone = true;

            setTimeout(async () => {
                await this.#resetZoom();
                showDecorationsAfterKnittingScene(this.#store);
                showFinalModal(this.#store);
            }, 1000);
        }
    }

    initEntity() {
        this.#entityElementHover.addEventListener('click', (e) => this.#entityMainAction(e));
        this.#entityElement.addEventListener('click', (e) => this.#entityMainAction(e));
    }
}

export default Scarf;
