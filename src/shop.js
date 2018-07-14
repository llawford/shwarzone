export default class Shop {
    constructor(location,employees,equipmentQuality,price){
        this.location = location;
        this.employees = employees;
        this.equipmentQuality = equipmentQuality; // 1 to 10
        this.price = price;
        this.goodExperiences = 0;
        this.badExperiences = 0;
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
}