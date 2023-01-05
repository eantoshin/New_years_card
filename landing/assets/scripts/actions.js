import * as actionTypes from './actionTypes';

export function setCatSceneData(data) {
    return {
        type: actionTypes.SET_CAT_SCENE_DATA,
        payload: data,
    };
}

export function setGingerbreadSceneData(data) {
    return {
        type: actionTypes.SET_GINGERBREAD_SCENE_DATA,
        payload: data,
    };
}

export function setKnittingSceneData(data) {
    return {
        type: actionTypes.SET_KNITTING_SCENE_DATA,
        payload: data,
    };
}

export function setGingerbreadCurrentColor(data) {
    return {
        type: actionTypes.SET_GINGERBREAD_CURRENT_COLOR,
        payload: data,
    };
}
