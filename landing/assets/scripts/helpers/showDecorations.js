import $ from 'jquery';

import { isCatSceneDone, isGingerbreadSceneDone, isKnittingSceneDone } from '../selectors';

export const showDecorationsAfterCatScene = (store) => {
    const isCatScreenDone = isCatSceneDone(store);

    if (isCatScreenDone) {
        setTimeout(() => {
            $('#christmas-decorations').removeClass('final-element-hidden');
        }, 1000);
    }
};

export const showDecorationsAfterGingerbreadScene = (store) => {
    const isGingerbreadScreenDone = isGingerbreadSceneDone(store);

    if (isGingerbreadScreenDone) {
        setTimeout(() => {
            $('#gerland').removeClass('final-element-hidden');
        }, 1000);
    }
};

export const showDecorationsAfterKnittingScene = (store) => {
    const isKnittingScreenDone = isKnittingSceneDone(store);

    if (isKnittingScreenDone) {
        setTimeout(() => {
            $('#santa-hat').removeClass('final-element-hidden');
            $('#flower-stars').removeClass('final-element-hidden');
        }, 1000);
    }
};
