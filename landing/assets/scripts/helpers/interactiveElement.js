export function addInteractiveElement(elementQuerySelector) {
    const element = document.querySelector(elementQuerySelector);

    if (element) {
        element.classList.remove('interactive-element-hidden');
    }
}

export function removeInteractiveElement(elementQuerySelector) {
    const element = document.querySelector(elementQuerySelector);

    if (element) {
        element.classList.add('interactive-element-hidden');
    }
}
