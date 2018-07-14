import { Map } from './map';
import { Shop } from './shop';

import 'p5';

let map = null;
window.preload = () => {
    Shop.preload();
}

window.setup = () => {
    createCanvas(800, 600).parent(document.getElementById('game'));
    map = new Map();
};

window.draw = () => {
    background(40);
    console.log(map);
    map.draw();
};
