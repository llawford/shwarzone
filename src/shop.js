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

    getEmployeeSkill(){
        var i = 0;
        var totalSkill = 0;
        this.employees.forEach(element => {
            i++;
            totalSkill = totalSkill + element;
        });
        return (totalSkill / i);
    }

    getNumEmployees(){
        return this.employees.count;
    }

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

    addEmployee(employeeSkill){
        this.employees.push(employeeSkill);
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

    draw() {
        image(this.sprite, 0, 0);
    }
}
