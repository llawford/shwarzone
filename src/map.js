import { Shop } from './shop';

import 'p5';
import { Student } from './student';

export class Map {
    CELL_SIZE = 30;

    static preload() {
        Map.background = loadImage('img/map.png');
    }

    constructor() {
        this.shops = [new Shop([], 1, 10, {x: 5, y: 5}, 100)];
        this.students = [new Student({x: 200, y:145},8), new Student({x: 403,y: 130})];
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
        this.userShop().money -= this.userShop().getEquipmentUpgradePrice();
        this.userShop().setEquipmentQuality(Math.min(10, this.userShop().equipmentQuality + 1));
        this.tick();
    }

    tick() {
        
        //list of shops
        var potentialShops = [];

        //for each student
        this.students.forEach(s => {

            //find shop that they are willing to go at
            this.shops.forEach(shop => {
                if (s.willPurchaseFrom(shop.location,shop.price)){
                    potentialShops.push(shop);
                }
            });

            if(potentialShops.length > 0){
                //select a random shop from potential ones
                var selectedShop = this.potentialShops[Math.floor(Math.random() * potentialShops.length)];

                //receive a shawarma - updates the shops
                selectedShop.serveShawarma();
            } else {
                //die if can't eat
                s.die();
            }
            
        });

        this.students = this.students.filter(s => s.isAlive == true);
        console.log(this.userShop().employees);
        console.log(this.userShop().equipmentQuality);
        // TODO
    }

    draw() {
        image(Map.background, 0, 0);

        this.shops.forEach(shop => {
            push();
            translate(shop.location.x, shop.location.y);
            shop.draw();
            pop();
        });

        // Draw your money
        textAlign(RIGHT, TOP);
        textSize(20);
        fill('#000000');
        text(`Money: ${this.userShop().money}`, 30*25, 0);
    }
}
