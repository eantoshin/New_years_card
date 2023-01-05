// TODO: проверить наличие селекторов
// Подумать ещё раз над классом
class DOMElements {
    #progressBar = document.querySelector('.main-page__progress-bar');
    #paints = document.querySelector('.main-page__paints');
    #fireplace = document.querySelector('.main-page__fireplace');
    #header = document.querySelector('.main-page__header');
    #handlePrompt = document.querySelector('.handle-prompt-cat');

    showPaints() {
        this.#paints.classList.remove('main-page__paints_hide');
    }

    hidePaints() {
        this.#paints.classList.add('main-page__paints_hide');
    }

    showProgressBar() {
        this.#progressBar.classList.remove('main-page__progress-bar_hide');
    }

    hideProgressBar() {
        this.#progressBar.classList.add('main-page__progress-bar_hide');
    }

    showHeader() {
        this.#header.style.display = 'flex';
    }

    hideHeader() {
        this.#header.style.display = 'none';
    }

    showPrompt() {
        this.#handlePrompt.style.display = 'flex';
    }

    hidePrompt() {
        this.#handlePrompt.style.display = 'none';
    }

    showAudioButton() {
        if (this.#fireplace) {
            this.#fireplace.style.display = 'block';
        }
    }

    hideAudioButton() {
        if (this.#fireplace) {
            this.#fireplace.style.display = 'none';
        }
    }
}

export default DOMElements;
