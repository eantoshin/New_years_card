import $ from 'jquery';

export const addMittenCursor = () => {
    $('<style>* { cursor: url("../../../../assets/images/mitten.svg"), auto; }</style>').appendTo('head');
};

export const resetMittenCursor = () => {
    $('style').replaceWith('');
};
