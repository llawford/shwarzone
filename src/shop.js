import Employee from './employee.js';
import 'p5';

export class Shop {
    static sprites = [];

    static preload() {
      Shop.sprites = [
        loadImage('img/tile.png')
      ];
    }

    constructor( employees,equipmentQuality,price, location, startingMoney){
        this.sprite = Shop.sprites[0];
        this.employees = employees;
        this.equipmentQuality = equipmentQuality; // 1 to 10
        this.price = price;
        this.goodExperiences = 0;
        this.badExperiences = 0;
        this.money = startingMoney;
        this.location = location;
    }

    // get average skill of all employees
    getEmployeeSkill(){ // tested
        let totalSkill = 0;
        this.employees.forEach(employee => {  
            totalSkill = totalSkill + employee.quality;
        });
        return (totalSkill / this.employees.length);
    }

    getNumEmployees(){ // tested
        return this.employees.length;
    }

    // get average rating
    getRating(){
        return this.goodExperiences/(this.goodExperiences + this.badExperiences);
    }

    getMoney(){
        //smtm7
        return this.price;
    }

    setPrice(price){
        this.price = price;
    }

    setEquipmentQuality(quality){
        this.equipmentQuality = quality;
    }

    addEmployee(employee){
        this.employees.push(employee);
    }

    addGoodExperience(){
        this.goodExperiences++;
    }

    addBadExperience(){
        this.badExperiences++;
    }

    adjustMoney(amount){
        this.money = this.money + amount;
    }

    getMoney(){
        return this.money;
    }

    serveShawarma(){
        //pick a random employee
        var prepGuy = this.employees[Math.floor(Math.random() * items.length)];
        this.adjustMoney(this.price);
        if(prepGuy.generateShawarma() && (Math.random() * 10 <= this.equipmentQuality)){
            this.addGoodExperience();
        } else {
            this.addBadExperience();
        }
    }


    draw() {
        image(this.sprite, 0, 0);
    }
}
