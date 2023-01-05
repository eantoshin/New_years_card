import $ from 'jquery';

import scarf from '../../images/final-modal/scarf.svg';
import gingerbread from '../../images/final-modal/gingerbread.svg';
import cat from '../../images/final-modal/cat.svg';

import { CARD_NAMES } from '../constants/cardNames';

import { sharing } from './sharing/sharing';

export const finalModal = () => {
    const modalFinalScreen = $('.modal-final-screen');
    const backToTheRoom = $('.back-to-the-room');
    const gingerbreadPainted = $('#gingerbread');
    const currentWinnerImage = $('#winnerImage');

    const sharingActions = sharing();

    const winnerRandomOptions = {
        'связали': scarf,
        'раскрасили': gingerbread,
        'намурчали': cat,
    };

    const winnerPostCard = {
        'связали': CARD_NAMES.knitting,
        'раскрасили': CARD_NAMES.gingerbread,
        'намурчали': CARD_NAMES.cat,
    };

    const winnerOptions = Object.entries(winnerRandomOptions);
    const randomOptionIndex = Math.floor(Math.random() * winnerOptions.length);
    const winnerImage = winnerOptions[randomOptionIndex][1];
    const winnerText = winnerOptions[randomOptionIndex][0];
    const winnerPostCardName = winnerPostCard[winnerText];

    sharingActions.updatePostCardName(winnerPostCardName);
    sharingActions.initSharing();

    $('#winnerText').text(winnerText);

    if (winnerText !== 'раскрасили') {
        gingerbreadPainted.css('display', 'none');
        currentWinnerImage
            .css('display', 'block')
            .attr('src', winnerImage);
    } else {
        gingerbreadPainted.css('display', 'block');
        currentWinnerImage.css('display', 'none');
    }

    modalFinalScreen.addClass('show');

    backToTheRoom.on('click', () => {
        modalFinalScreen.removeClass('show');

        sharingActions.resetSharing();
    });
};
