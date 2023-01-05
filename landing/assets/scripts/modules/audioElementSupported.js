export const audioElementSupported = (() => {
    const audio = document.createElement('audio');
    const canPlay = {};

    if (typeof audio.canPlayType === 'function') {
        canPlay.supported = Boolean(true);
        canPlay.mp3 = audio.canPlayType('audio/mpeg');
        canPlay.ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
        canPlay.wav = audio.canPlayType('audio/wav; codecs="1"');
    } else {
        canPlay.supported = Boolean(false);
    }
    return canPlay;
})();
