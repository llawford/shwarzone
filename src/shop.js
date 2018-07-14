import Employee from './employee.js';
import 'p5';
export const yourshop = 0;
export const LAZEEZ = 1;
export const othershop = 2;
export const shawarmaplus = 3;


export class Shop {

    ingredientPrice = 5;

    static sprites = [];

    static preload() {
      Shop.sprites = [
        loadImage('img/yourshop.png'),
        loadImage('img/LAZEEZ.png'),
        loadImage('img/badshop.png'),
        loadImage('img/shawarmaplus.png')
      ];
    }

    constructor( employees,equipmentQuality,price, location, startingMoney,shopIndex){
        this.employees = employees;
        this.equipmentQuality = equipmentQuality; // 1 to 10
        this.price = price;
        this.goodExperiences = 0;
        this.badExperiences = 0;
        this.money = startingMoney;
        this.location = location;
        this.sprite = Shop.sprites[shopIndex];
        this.rating = 0.5;
        this.recentReviews = [];
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
        return this.rating;
    }

    updateRating() {
        if (this.recentReviews.length == 0) {
            this.rating = 0.5;
        } else {
            total = 0;
            i = 0;
            this.recentReviews.forEach(element => {
                total = total + element;
                i++;
            });
            this.rating = total/i;
        }

    }

    getPrice(){
        return this.price;
    }

    setPrice(price){
        this.price = price;
    }

    getEquipmentUpgradePrice() {
        if (this.equipmentQuality == 10) {
            return Infinity;
        }
        return (this.equipmentQuality + 1) * 100;
    }

    setEquipmentQuality(quality){
        this.equipmentQuality = quality;
    }

    addEmployee(employee){
        this.employees.push(Employee.generateEmployee());
    }

    removeEmployee() {
        const employeeIndex = Math.floor(Math.random() * this.employees.length);
        this.employees.splice(employeeIndex, 1);
    }

    addGoodExperience(){
        this.recentReviews.push(1);
        while (this.recentReviews.length > 25){
            this.recentReviews.shift();
        }
    }

    addBadExperience(){
        this.recentReviews.push(0);
        while (this.recentReviews.length > 25){
            this.recentReviews.shift();
        }
    }

    adjustMoney(amount){
        this.money = this.money + amount;
    }

    getMoney(){
        return this.money;
    }

    serveShawarma(){
        //if no one is here, bad time
        if(this.employees.length < 1){
            this.addBadExperience();
        } else {
            //pick a random employee
            var prepGuy = this.employees[Math.floor(Math.random() * this.employees.length)];
            this.adjustMoney(this.price-this.ingredientPrice);
            if(prepGuy.generateShawarma() && (Math.random() * 200 <= 200 - Math.pow((11 - this.equipmentQuality),2))){
                this.addGoodExperience();
            } else {
                this.addBadExperience();
            }
        }      
    }



    draw() {
        image(this.sprite, this.location.x - 15, this.location.y - 15);
        textAlign(CENTER, TOP);
        textSize(12);
        fill('#000000');
        stroke('#FFFFFF');

        const rating = Math.round(this.getRating() * 100);
        text(`${rating}`, this.location.x, this.location.y + 15);
    }
}
