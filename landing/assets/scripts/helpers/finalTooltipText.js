import reloadIconTooltip from '../../images/tooltip/reload-icon-tooltip.svg';

export const setFinalTooltipText = () => {
    const finalReloadIcon = document.createElement('img');
    const finalTooltip = document.createElement('div');
    const firstText = 'Это успех! ' +
        'Как ваше новогоднее настроение? ' +
        'Если вы еще раз хотите погладить кота или связать шарф, ' +
        'можно перезапустить открытку с помощью кнопки';
    const secondText = 'в углу.';

    finalReloadIcon.src = reloadIconTooltip;
    finalReloadIcon.classList.add('final-reload-icon');

    finalTooltip.append(firstText, finalReloadIcon, secondText);

    return finalTooltip;
};
