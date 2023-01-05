import $ from 'jquery';

import '../styles/index.less';

import configureStore from './store';

import fireplaceMP3 from '../audio/fireplace.mp3';

import snowLeningradMP3 from '../audio/snow_leningrad.mp3';
import hotelRomanticMP3 from '../audio/hotel_romantic.mp3';
import timesChangingMP3 from '../audio/times_changing.mp3';
import outTonightMP3 from '../audio/out_tonight.mp3';

import snowLeningradOGG from '../audio/snow_leningrad.ogg';
import hotelRomanticOGG from '../audio/hotel_romantic.ogg';
import timesChangingOGG from '../audio/times_changing.ogg';
import outTonightOGG from '../audio/out_tonight.ogg';

import snowLeningradWAV from '../audio/snow_leningrad.wav';
import hotelRomanticWAV from '../audio/hotel_romantic.wav';
import timesChangingWAV from '../audio/times_changing.wav';
import outTonightWAV from '../audio/out_tonight.wav';

import { finalModal } from './modules/modal-final-screen';
import { songsModal } from './modules/modal-question-songs';
import { showTooltip } from './modules/showTooltip';
import { initPanzoom } from './modules/initPanzoom';
import { initScenes } from './modules/initScenes';
import { audioElementSupported } from './modules/audioElementSupported';

import {
    initialFinalClasses,
    initialInteractiveClasses,
    initialCustomClasses,
    initialInteractiveHoverClasses,
} from './animations/setClasses';
import { hoverElements } from './animations/hoverElements';
import { MAIN_TOOLTIP_TEXT, FORTUNE_TELLER_TOOLTIP_TEXT } from './constants/tooltipText';
import { sendEmail } from './helpers/sendEmail';

export const store = configureStore();

configureStore();
initialFinalClasses();
initialInteractiveClasses();
initialInteractiveHoverClasses();
initialCustomClasses();
hoverElements();

const main = $('#main');
const loader = $('#loader');
const greetingButton = $('.greeting-button');
const modalGreeting = $('.modal-greeting');
const soundsIcon = $('.sounds-icon');
const shareIcon = $('.share-icon');
const reloadIcon = $('.reload-icon');
const flamesHover = $('.flames-item-hover');
const flamesActive = $('.flames_active');

const fortuneTellerHover = $('#hover-poster');
const fortuneTeller = $('#fortune-teller-second');
const tangerines = $('#hover-tangerines');
const tangerinesWithoutPeel = $('#tangerines-without-peel');
const tangerinesInPeel = $('#tangerines-in-peel');
const candlesHover = $('#hover-candles');
const candles = $('#burning-candles');
const flameHover = $('#hover-fireplace');
const flame = $('#flame');
const flamesSound = $('#flames-sound');
const playlistSounds = $('#playlist-sounds');

const interactiveHidden = 'interactive-element-hidden';
const audio = $('audio');

const audioPlaylist = document.getElementById('playlist-sounds');

const finalModalShareEmail = $('.share-mail');

let songsCount = 0;
let canSwitchSoundIconTrack = true;

const { supported, mp3, ogg, wav } = audioElementSupported;
const canPlayMp3 = mp3 !== '';
const canPlayOgg = ogg !== '';
const canPlayWav = wav !== '';

const songsMP3 = [
    snowLeningradMP3,
    hotelRomanticMP3,
    timesChangingMP3,
    outTonightMP3,
];

const songsOGG = [
    snowLeningradOGG,
    hotelRomanticOGG,
    timesChangingOGG,
    outTonightOGG,
];

const songsWAV = [
    snowLeningradWAV,
    hotelRomanticWAV,
    timesChangingWAV,
    outTonightWAV,
];

$(document).ready(() => {
    setTimeout(() => {
        main.addClass('loading-complete');
        loader.remove();
    }, 1000);
});

flamesHover.on('click', () => {
    flamesActive.css('display', 'block');
});

greetingButton.on('click', () => {
    modalGreeting.css('display', 'none');

    showTooltip({ text: MAIN_TOOLTIP_TEXT, store: store });

    songsModal();
});

const getSongsCount = (songs) => {
    if (songsCount === songs.length - 1) {
        songsCount = 0;
    } else {
        songsCount++;
    }
};

const canPlaySongs = () => {
    canSwitchSoundIconTrack = false;

    if (supported) {
        if (canPlayMp3) {
            getSongsCount(songsMP3);

            return playlistSounds.attr('src', songsMP3[songsCount]);
        }

        if (canPlayOgg) {
            getSongsCount(songsOGG);

            return playlistSounds.attr('src', songsOGG[songsCount]);
        }

        if (canPlayWav) {
            getSongsCount(songsWAV);

            return playlistSounds.attr('src', songsWAV[songsCount]);
        }
    }

    return alert('Ваш браузер не поддерживает аудио файлы!');
};

$('#hover-radio, .button-yes').on('click', () => {
    canPlaySongs();
});

audioPlaylist.addEventListener('ended', () => {
    canPlaySongs();
}, false);

flameHover.on('click', () => {
    flame.removeClass(interactiveHidden);
    flameHover.remove();

    flamesSound.attr('src', fireplaceMP3);
});

fortuneTellerHover.on('click', () => {
    fortuneTeller.removeClass(interactiveHidden);
    fortuneTellerHover.remove();

    showTooltip({
        text: FORTUNE_TELLER_TOOLTIP_TEXT,
        isFortuneTeller: true,
        store: store,
    });
});

tangerines.on('click', () => {
    tangerinesInPeel.addClass(interactiveHidden);
    tangerinesWithoutPeel.removeClass(interactiveHidden);
    tangerines.remove();
});

candlesHover.on('click', () => {
    candles.removeClass(interactiveHidden);
    candlesHover.remove();
});

soundsIcon.on('click', () => {
    if (canSwitchSoundIconTrack) {
        canPlaySongs();

        canSwitchSoundIconTrack = false;
    }

    soundsIcon.toggleClass('sounds-muted');

    if (audio.attr('muted')) {
        audio
            .removeAttr('muted')
            .prop('muted', false);
    } else {
        audio
            .attr('muted', true)
            .prop('muted', true);
    }
});

reloadIcon.on('click', () => {
    location.reload();
});

shareIcon.on('click', () => {
    finalModal();
});

finalModalShareEmail.on('click', () => {
    sendEmail();
});

initPanzoom();
initScenes(store);

function playAudio(audioList) {
    audioList.each(function startPlay() {
        if (this.getAttribute('src') && this.paused) {
            this.play();
        }
    });
}

function stopAudio(audioList) {
    audioList.each(function stopPlay() {
        if (this.getAttribute('src') && !this.paused) {
            this.pause();
        }
    });
}

$(document).on('visibilitychange', () => {
    if (document.hidden) {
        stopAudio(audio);
    } else {
        playAudio(audio);
    }
});
