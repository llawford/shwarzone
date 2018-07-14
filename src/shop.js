export class Shop {
    constructor(location,employees,equipmentQuality,price){
        this.location = location;
        this.employees = employees;
        this.equipmentQuality = equipmentQuality; // 1 to 10
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

    getNumEmployees(){
        return this.employees.count;
    }

    getRating(){
        return this.goodExperiences/(this.goodExperiences + this.badExperiences);
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
}