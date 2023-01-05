import { MAX, MIN } from '../constants/progressBar';

import { initCatScene } from './cat/catInit';
import { initGingerbreadScene } from './gingerbread/gingerbreadInit';
import { initScarfScene } from './scarf/scarfInit';

import ProgressBar from './progressBar/ProgressBar';

export const initScenes = (store) => {
    const progressBar = new ProgressBar(0, {
        min: MIN,
        max: MAX,
    });

    initCatScene(store, progressBar);
    initGingerbreadScene(store, progressBar);
    initScarfScene(store, progressBar);
};
