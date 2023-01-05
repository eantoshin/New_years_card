import Gingerbread from './Gingerbread';

export const initGingerbreadScene = (store, progressBar) => {
    const gingerbread = new Gingerbread(store, progressBar);

    gingerbread.initEntity();
};
