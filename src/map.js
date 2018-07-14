import { Shop } from './shop';

import 'p5';

export class Map {
  CELL_SIZE = 30;

  constructor() {
    this.shops = [new Shop([], 0.5, 10, {x: 5, y: 5}, 100)];
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
