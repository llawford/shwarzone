import { Shop } from './shop';
import { Student } from './student';
import { Employee } from './employee';

import 'p5';
import { sample } from 'lodash';

export class Map {
    CELL_SIZE = 30;

    static preload() {
        Map.background = loadImage('img/map.png');
    }

    constructor(upgradeBtn, hireBtn, fireBtn, showMenu, hideMenu) {
        this.shops = [new Shop([new Employee(10, 10, false)], 1, 10, {x: 5, y: 5}, 100)];
        this.students = [];
        for (var i = 0; i < 50;i++){
            this.students.push(Student.generateRandomStudent());
        }

        this.upgradeBtn = upgradeBtn;
        this.hireBtn = hireBtn;
        this.fireBtn = fireBtn;
        this.showMenu = showMenu;
        this.hideMenu = hideMenu;

        upgradeBtn.addEventListener('click', () => this.upgrade());
        hireBtn.addEventListener('click', () => this.hire());
        fireBtn.addEventListener('click', () => this.fire());
    }

    userShop() {
        return this.shops[0];
    }

    updateButtons() {
        const price = this.userShop().getEquipmentUpgradePrice();
        this.upgradeBtn.innerText = `Upgrade equipment: \$${price}`
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
        this.hideMenu();
        
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
                const selectedShop = sample(potentialShops);
                console.log(selectedShop);

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

        this.updateButtons();
        setTimeout(this.showMenu, 1000);
    }

    draw() {
        image(Map.background, 0, 0);

        this.shops.forEach(shop => {
            push();
            translate(shop.location.x, shop.location.y);
            shop.draw();
            pop();
        });

        this.students.forEach(student => {
            push();
            translate(student.location.x, student.location.y);
            student.draw();
            pop();
        });

        // Draw your money
        textAlign(RIGHT, TOP);
        textSize(20);
        fill('#000000');
        text(`Money: ${this.userShop().money}`, 30*25, 0);
    }
}
