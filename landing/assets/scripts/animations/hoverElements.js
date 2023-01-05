import $ from 'jquery';

import { interactiveHover } from '../constants/interactive-elements';

export const hoverElements = () => {
    interactiveHover.forEach((element) => {
        $(`#${element}`).hover((e) => {
            $(e.currentTarget).addClass('hover');
        }, (e) => {
            $(e.currentTarget).removeClass('hover');
        });
    });
};
