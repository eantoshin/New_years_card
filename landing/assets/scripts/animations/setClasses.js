import $ from 'jquery';

import {
    finalElements,
    interactiveElements,
    interactiveElementsForFinal,
    interactiveHover,
    idClassMatching,
} from '../constants/interactive-elements';

export const initialFinalClasses = () => {
    finalElements.forEach((element) => {
        $(`#${element}`).addClass('final-element-hidden');
    });
};

export const removeFinalClasses = () => {
    finalElements.forEach((element) => {
        $(`#${element}`).removeClass('final-element-hidden');
    });
};

export const showInteractiveElements = () => {
    const flameHover = $('#hover-fireplace');
    const candlesHover = $('#hover-candles');
    const tangerinesHover = $('#hover-tangerines');

    flameHover.remove();
    candlesHover.remove();
    tangerinesHover.remove();

    interactiveElementsForFinal.forEach((element) => {
        $(`#${element}`).removeClass('interactive-element-hidden');
    });
};

export const initialInteractiveClasses = () => {
    interactiveElements.forEach((element) => {
        $(`#${element}`).addClass('interactive-element-hidden');
    });
};

export const initialInteractiveHoverClasses = () => {
    interactiveHover.forEach((element) => {
        $(`#${element}`).addClass('interactive-element-hover');
    });
};

export const initialCustomClasses = () => {
    Object.entries(idClassMatching).forEach(([ id, className ]) => {
        $(`#${id}`).addClass(className);
    });
};
