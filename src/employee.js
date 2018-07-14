export class Employee{
  constructor(quality, salary, isUnionized){ 
    this.quality = quality // out of 100
    this.salary = salary
    this.isUnionized = isUnionized // salary is dollars per day
  }
  generateShawarma(){
    const randomnumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1; // random number out of 100
    if (randomnumber < this.quality) {
      return true // made good shawarma
    } else {
      return false // made bad shawarma
    }
  }

  static generateEmployee() {
      const quality = Math.floor(Math.random()*10)+1;
      const salary = 10 * quality + Math.floor(Math.random()*20 - 10);
      return new Employee(quality, salary, Math.random() > 0.8);
  }
}

export default Employee
