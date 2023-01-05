import $ from 'jquery';

export const addPaintBrushCursor = () => {
    $('<style>* { cursor: url("../../../../assets/images/paintBrush.svg"), auto; }</style>').appendTo('head');
};

export const resetPaintBrushCursor = () => {
    $('style').replaceWith('');
};
