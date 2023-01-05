function storeSelector(store) {
    return store.getState();
}

export function isAllScenesDone(store) {
    const currentStore = storeSelector(store);

    const isCatScreenDone = currentStore.catScreen.isDone;
    const isKnittingScreenDone = currentStore.knittingScreen.isDone;
    const isGingerbreadScreenDone = currentStore.gingerbreadScreen.isDone;

    return isCatScreenDone && isKnittingScreenDone && isGingerbreadScreenDone;
}

export function isCatSceneDone(store) {
    return storeSelector(store).catScreen.isDone;
}

export function isKnittingSceneDone(store) {
    return storeSelector(store).knittingScreen.isDone;
}

export function isGingerbreadSceneDone(store) {
    return storeSelector(store).gingerbreadScreen.isDone;
}

export function isCatSceneActive(store) {
    return storeSelector(store).catScreen.isActive;
}

export function isKnittingSceneActive(store) {
    return storeSelector(store).knittingScreen.isActive;
}

export function isGingerbreadSceneActive(store) {
    return storeSelector(store).gingerbreadScreen.isActive;
}

export function getGingerbreadColors(store) {
    return storeSelector(store).gingerbreadScreen.paints;
}
