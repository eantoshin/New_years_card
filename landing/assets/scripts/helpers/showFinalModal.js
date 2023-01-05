import $ from 'jquery';

import { isAllScenesDone } from '../selectors';

import { finalModal } from '../modules/modal-final-screen';
import { showTooltip } from '../modules/showTooltip';

import { setFinalTooltipText } from './finalTooltipText';

import { removeFinalClasses, showInteractiveElements } from '../animations/setClasses';

export const showFinalModal = (store) => {
    const isScenesDone = isAllScenesDone(store);

    if (isScenesDone) {
        const shareIcon = $('.share-icon');
        const reloadIcon = $('.reload-icon');

        setTimeout(() => {
            removeFinalClasses();
            showInteractiveElements();

            showTooltip({ text: setFinalTooltipText(), store: store });
        }, 1000);

        setTimeout(() => {
            finalModal();
        }, 3000);

        shareIcon.css('display', 'block');
        reloadIcon.css('display', 'block');
    }
};
