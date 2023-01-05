import $ from 'jquery';
import { setFinalTooltipText } from '../helpers/finalTooltipText';
import { isAllScenesDone } from '../selectors';
import { MAIN_TOOLTIP_TEXT } from '../constants/tooltipText';

export const showTooltip = (params) => {
    let {
        hidden = false,
        isFortuneTeller = false,
    } = params;
    const {
        text,
        store,
    } = params;

    const tooltip = $('.tooltip');
    const tooltipText = $('.tooltip-text');
    const tooltipWrapper = $('.tooltip-wrapper');
    const cross = $('.tooltip-cross');
    const shark = $('.shark-image');

    const hideTooltip = () => {
        hidden = true;
        tooltip.css('display', 'none');
        cross.css('display', 'none');
    };

    if (isFortuneTeller) {
        setTimeout(() => {
            hideTooltip();
        }, 3000);
    }

    const showTooltipOptions = () => {
        if (!hidden) {
            tooltip.css('display', 'flex');
            cross.css('display', 'block');
        }

        if (hidden) {
            hideTooltip();
        }

        tooltipWrapper.addClass('active');
    };

    tooltipText.html(text);

    showTooltipOptions();

    cross.on('click', () => {
        hideTooltip();
    });

    shark.on('click', () => {
        const isScenesDone = isAllScenesDone(store);

        if (!hidden) {
            hidden = true;
            hideTooltip();
        } else {
            hidden = false;

            if (isFortuneTeller) {
                isFortuneTeller = false;

                if (isScenesDone) {
                    tooltipText.html(setFinalTooltipText());
                } else {
                    tooltipText.html(MAIN_TOOLTIP_TEXT);
                }
            }

            showTooltipOptions();
        }
    });
};
