export function delay(delayMs = 0, delayCallback) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (delayCallback) {
                delayCallback();
            }

            resolve();
        }, delayMs);
    });
}
