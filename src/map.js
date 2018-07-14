import { Shop, yourshop, LAZEEZ, othershop, shawarmaplus } from './shop';
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
        this.shops = [
            //Your Shop
            new Shop(
                [Employee.generateEmployee()], 
                1, 
                7, 
                {x: 5, y: 5}, 
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
                s.goToShop(selectedShop);

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
        text(`Money: ${this.userShop().money}`, 30*25, 0);
    }
}
