import { Shop } from './shop';

import 'p5';

export class Map {
    CELL_SIZE = 30;

    constructor() {
        this.shops = [new Shop([], 1, 10, {x: 5, y: 5}, 100)];
    }

    userShop() {
        return this.shops[0];
    }

    hire() {
        this.userShop().addEmployee(Math.random());
        this.tick();
    }

    fire() {
        this.userShop().removeEmployee();
        this.tick();
    }

    upgrade() {
        this.userShop().setEquipmentQuality(Math.min(10, this.userShop().equipmentQuality + 1));
        this.tick();
    }

    tick() {
        console.log(this.userShop().employees);
        console.log(this.userShop().equipmentQuality);
        // TODO
    }

    draw() {
        this.shops.forEach(shop => {
            push();
            translate(shop.location.x * 30, shop.location.y * 30);
            shop.draw();
            pop();
        });
    }
}
