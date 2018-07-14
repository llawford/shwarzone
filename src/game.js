import Employee from './employee.js';
import { Map } from './map';
import { Shop } from './shop';
import { Student } from './student';

import 'p5';

let map = null;

const upgrade = document.getElementById('upgrade');
const hire = document.getElementById('hire');
const fire = document.getElementById('fire');

window.preload = () => {
    Shop.preload();
    Map.preload();
    Student.preload();
}

window.setup = () => {
    createCanvas($(window).width() / 30*30, 30*25).parent(document.getElementById('game'));
    map = new Map(upgrade, hire, fire);
};

window.draw = () => {
    background(40);
    map.draw();
};
