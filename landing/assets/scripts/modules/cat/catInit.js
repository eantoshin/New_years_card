import Cat from './Cat';

export const initCatScene = (store, progressBar) => {
    const cat = new Cat(store, progressBar);

    cat.initEntity();
};
