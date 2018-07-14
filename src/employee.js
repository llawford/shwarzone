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
}

export default Employee