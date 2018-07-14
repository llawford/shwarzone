export class Shop {
    constructor(employees,equipmentQuality,price){
        this.employees = employees;
        this.equipmentQuality = equipmentQuality;
        this.price = price;
        this.goodExperiences = 0;
        this.badExperiences = 0;
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
}