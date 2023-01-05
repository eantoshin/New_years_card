import Scarf from './Scarf';

export const initScarfScene = (store, progressBar) => {
    const scarf = new Scarf(store, progressBar);

    scarf.initEntity();
};
