import PanzoomUtil from './panzoom';

export const initPanzoom = () => {
    const svgBackground = document.getElementById('main-screen');

    PanzoomUtil.getInstance(svgBackground);
};
