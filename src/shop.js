import 'p5';

export class Shop {
    static sprites = [];

    static preload() {
      Shop.sprites = [
        loadImage('img/tile.png')
      ];
      console.log(Shop.sprites)
    }

    constructor( employees,equipmentQuality,price, location){
        this.sprite = Shop.sprites[0];
        this.employees = employees;
        this.equipmentQuality = equipmentQuality;
        this.price = price;
        this.goodExperiences = 0;
        this.badExperiences = 0;
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

    getRating(){
        return this.goodExperiences/(this.goodExperiences + this.badExperiences);
    }

    setPrice(price){
        this.price = price;
    }

    setEquipmentQuality(quality){
        
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

    draw() {
        image(this.sprite, 0, 0);
    }
}
