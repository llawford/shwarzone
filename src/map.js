import { Shop, yourshop, LAZEEZ, othershop, shawarmaplus } from './shop';
import { Student } from './student';
import { Employee } from './employee';

import 'p5';
import { sample } from 'lodash';
import { distanceBetween } from './utils';


export class Map {
    CELL_SIZE = 30;

    static preload() {
        Map.background = loadImage('img/map.png');
    }

    constructor(upgradeBtn, hireBtn, fireBtn, skipBtn, showMenu, hideMenu) {
        this.shops = [
            //Your Shop
            new Shop(
                [Employee.generateEmployee()], 
                1, 
                7, 
                {x: 200, y: 200}, 
                1000,
                yourshop
            ),
            //lazeez
            new Shop(
                [Employee.generateEmployee(), Employee.generateEmployee(),
                Employee.generateEmployee()], 
                3, 
                9, 
                {x: 265, y: 288}, 
                1000,
                LAZEEZ
            ),
            //shawerma plus
            new Shop(
                [Employee.generateEmployee(), Employee.generateEmployee()], 
                8, 
                10, 
                {x: 500, y: 68}, 
                800,
                shawarmaplus
            ),
            //Royale
            new Shop(
                [Employee.generateEmployee(), Employee.generateEmployee(),
                Employee.generateEmployee()], 
                9, 
                12, 
                {x: 671, y: 235}, 
                1200,
                othershop
            ),

        ];
        this.students = [];
        for (var i = 0; i < 50;i++){
            this.students.push(Student.generateRandomStudent());
        }

        this.upgradeBtn = upgradeBtn;
        this.hireBtn = hireBtn;
        this.fireBtn = fireBtn;
        this.showMenu = showMenu;
        this.hideMenu = hideMenu;
        this.skipBtn = skipBtn;

        upgradeBtn.addEventListener('click', () => this.upgrade());
        hireBtn.addEventListener('click', () => this.hire());
        fireBtn.addEventListener('click', () => this.fire());
        skipBtn.addEventListener('click', () => this.tick());
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

            if(potentialShops.length > 0) {
                const totalWeight = potentialShops.reduce((total, shop) => total + shop.getRating(), 0);
                let randomWeight = Math.random() * totalWeight;
                let shopIndex = -1;
                do {
                    shopIndex++;
                    randomWeight -= potentialShops[shopIndex].getRating();
                } while (randomWeight > 1e-5);
                const selectedShop = potentialShops[shopIndex];

                s.goToShop(selectedShop);

                //receive a shawarma - updates the shops
                selectedShop.serveShawarma();
            } else {
                //die if can't eat
                s.die();
            }
            
        });

        this.shops.forEach(shop => shop.updateRating());

        this.students = this.students.filter(s => s.isAlive == true);
        console.log(this.userShop().employees);
        console.log(this.userShop().equipmentQuality);
        // TODO

        this.updateButtons();
        setTimeout(() => {
            this.students.forEach(s => s.goHome());
        }, 1000);
        setTimeout(this.showMenu, 2000);
    }

    draw() {
        image(Map.background, 0, 0);

        this.shops.forEach(shop => shop.draw());

        this.students.forEach(student => {
            student.tick();
            student.draw();
        });

        // Draw your money
        textAlign(RIGHT, TOP);
        textSize(20);
        fill('#000000');
        noStroke();
        text(`Money: ${this.userShop().money}`, 30*25, 0);
    }

    relocateYourShop(x,y){
       
        this.shops[0].adjustMoney(-distanceBetween(this.shops[0].location,{x,y}));
        this.shops[0].location = {x,y};
        
    }

}
