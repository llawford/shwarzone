import Employee from './employee.js';
import { Map } from './map';
import { Shop } from './shop';

import 'p5';

let map = null;
window.preload = () => {
    Shop.preload();
}

window.setup = () => {
    createCanvas(30*25, 30*20).parent(document.getElementById('game'));
    map = new Map();
};

window.draw = () => {
    background(40);
    map.draw();
};
