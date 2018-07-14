import Employee from './employee.js';
import { Map } from './map';
import { Shop } from './shop';
import { Student } from './student';
import {GhostParticle} from './ghost';

import 'p5';

let map = null;

const menu = document.getElementById('menu');

const hideMenu = () => document.body.removeChild(menu);
const showMenu = () => document.body.appendChild(menu);

window.preload = () => {
    Shop.preload();
    Map.preload();
    Student.preload();
    GhostParticle.preload();
}

window.setup = () => {
    createCanvas(30*25, 30*20).parent(document.getElementById('game'));
    map = new Map(showMenu, hideMenu);
};

window.draw = () => {
    background(40);
    map.draw();
};

window.mousePressed = () => {
    if(mouseX <= 740 && mouseX >=10 && mouseY <= 590 && mouseY >= 10){
        map.relocateYourShop(mouseX,mouseY);
    }
}
