import $ from 'jquery';

export const songsModal = () => {
    const modalQuestionSongs = $('.modal-question-songs');
    const soundsIcon = $('.sounds-icon');
    const buttonNo = $('.button-no');
    const buttonYes = $('.button-yes');
    const audio = $('audio');

    setTimeout(() => (
        modalQuestionSongs.addClass('show')
    ), 1000);

    buttonNo.on('click', () => {
        modalQuestionSongs.removeClass('show');
        soundsIcon.toggleClass('sounds-muted');

        audio
            .attr('muted', true)
            .prop('muted', true);
    });
    buttonYes.on('click', () => modalQuestionSongs.removeClass('show'));
};
