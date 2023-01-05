import * as actionTypes from './actionTypes';

const initialState = {
    // TODO: просто тестовая структура
    // На подумать
    progress: 0,
    catScreen: {
        isActive: false,
        isDone: false,
        progress: 0,
    },
    gingerbreadScreen: {
        isActive: false,
        isDone: false,
        progress: 0,
        // color: null,
        paints: {
            roof: {
                color: [],
                elements: [
                    '#roof-attic-snowflakes path',
                    '#roof-snowflakes path',
                ],
            },
            wood: {
                color: [],
                elements: [
                    '#wood-snow-cap path', '#wood-trunk-first-color path',
                    '#wood-trunk-second-color path',
                ],
            },
            doorjamb: {
                color: [],
                elements: [
                    '#doorjamb-facade path',
                ],
            },
        },
    },
    knittingScreen: {
        isActive: false,
        isDone: false,
        progress: 0,
    },
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CAT_SCENE_DATA:
            return { ...state, catScreen: {
                ...state.catScreen,
                ...action.payload,
            } };
        case actionTypes.SET_GINGERBREAD_SCENE_DATA:
            return { ...state, gingerbreadScreen: {
                ...state.gingerbreadScreen,
                ...action.payload,
            } };
        case actionTypes.SET_KNITTING_SCENE_DATA:
            return { ...state, knittingScreen: {
                ...state.knittingScreen,
                ...action.payload,
            } };
        case actionTypes.SET_GINGERBREAD_CURRENT_COLOR: {
            const { color, part } = action.payload;

            return { ...state,
                gingerbreadScreen: {
                    ...state.gingerbreadScreen,
                    paints: {
                        ...state.gingerbreadScreen.paints,
                        [part]: {
                            ...state.gingerbreadScreen.paints[part],
                            color,
                        },
                    },
                },
            };
        }
        default:
            return state;
    }
}

export default appReducer;
