import $ from 'jquery';

import { delay } from '../../helpers/delay';
import {
    addInteractiveElement,
    removeInteractiveElement,
} from '../../helpers/interactiveElement';

class ScarfAnimation {
    transformKnittingPromise = null;
    transformKnittingPromiseResolve = null;

    // TODO: доработать
    // Чтобы была отмена
    // Возможно использовать keyframe
    async transformNeedles() {
        const right = $('#knitting-needle-right');
        const left = $('#knitting-needle-left');
        right.addClass('right-needle-transform');
        left.addClass('left-needle-transform');
        await delay(500);
        right.removeClass('right-needle-transform');
        left.removeClass('left-needle-transform');
    }

    async transformKnittingScene() {
        // TODO: delay не подходит, так как если мы приблизим и зразу отдалим сцену
        // То delay при открытии продолжат выполняться на закрытии
        // И у нас будут добавляться классы, которых не должно быть
        // Когда сцена закроется, то некоторые элементы у нас не исчезнут

        // TODO: либо вынести resolve наружу
        // И при помощи resolve отменять этот промис

        // return new Promise((resolve) => {
        //     this.transformKnittingPromiseResolve = resolve;

        //     resolve('done');

        //     return delay(800).then(() => {
        //         ScarfAnimation.removeInteractiveElement('#yarn');

        //         return delay(400);
        //     }).then(() => {
        //         document.querySelector('#scarf').classList.add('scarf-block-transform');

        //         return delay(400);
        //     }).then(() => {
        //         ScarfAnimation.addInteractiveElement('#knitting-needles');

        //         this.transformKnittingPromiseResolve = null;
        //     });

        //     // this.transformKnittingPromiseResolve = null;
        // });

        removeInteractiveElement('#default-needles');
        await delay(800);
        $('#scarf').addClass('scarf-block-transform');
        await delay(400);
        addInteractiveElement('#knitting-needles');

        // TODO: можно попробовать добавлять специальные классы
        // element.classList.add('scarf-block-transform transform-delay-400');
    }

    // resolveTransformKnittingScene() {
    //     if (this.transformKnittingPromiseResolve) {
    //         this.transformKnittingPromiseResolve('done');
    //     }
    // }

    async resetTransformKnittingScene() {
        // this.resolveTransformKnittingScene();

        removeInteractiveElement('#knitting-needles');
        await delay(400);
        $('#scarf').removeClass('scarf-block-transform');
        await delay(400);
        addInteractiveElement('#default-needles');
    }
}

export default ScarfAnimation;
