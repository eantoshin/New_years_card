import $ from 'jquery';
// TODO: доработать логику вычислений
class ProgressBar {
    #progressBarValue = 0;
    #progressBarDOMElement = null;
    #progressBarLineDOMElement = null;
    #min = null;
    #max = null;
    #step = 1;

    // min, max, step
    constructor(initialValue = 0, progressBarSettings) {
        // TODO: проверить, чтобы не был меньше min
        // this.#progressBarValue = initialValue < min ? min : initialValue;
        this.#progressBarValue = initialValue;
        this.#progressBarDOMElement = document.getElementById('progress-bar-block');
        // TODO: возвращать ошибку, если не получается найти нужный DOM элемент
        this.#progressBarLineDOMElement = this.#progressBarDOMElement?.querySelector('.progress-line');
        this.#max = progressBarSettings?.max ?? 100;
        this.#min = progressBarSettings?.min ?? 0;
        this.#step = progressBarSettings?.step || 1;
        this.setProgressBarViewLine();
    }

    removeProgressLineTransition() {
        $('#progress-bar-block .progress-line').addClass('progress-line__instantly');
    }

    setProgressLineTransition() {
        $('#progress-bar-block .progress-line').removeClass('progress-line__instantly');
    }

    updateProgressBarStep(step) {
        this.#step = step || 1;
    }

    increaseByOneUnit() {
        // TODO: добавить ограничения, чтобы не больше max
        const nextStepValue = this.#progressBarValue + this.#step;

        if (this.#max > nextStepValue) {
            this.#progressBarValue = nextStepValue;
        } else {
            this.#progressBarValue = this.#max;
        }
    }

    setProgressBarViewLine() {
        // TODO: нужно, чтобы и в минус считалось
        const currentPercent = (this.#progressBarValue * 100) / (this.#max - this.#min);

        this.#progressBarLineDOMElement.style.width = `${currentPercent}%`;
    }

    set setProgressBarValue(value) {
        this.#progressBarValue = value;
    }

    get getProgressBarValue() {
        return this.#progressBarValue;
    }
}

export default ProgressBar;
