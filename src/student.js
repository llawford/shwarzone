import {distanceBetween} from "./utils";

export class Student{

    static preload() {
      Student.sprites = [
        loadImage('img/student.png')
      ];
    }

    constructor(location,budget){
        this.location = location; // x and y integers
        this.budget = budget; //max budget per day, should be 5-15
        this.isAlive = true;
        this.sprite = Student.sprites[0];
    }

    decayDistance = 100;

    die(){
        this.isAlive = false;
    }

    updateLocation(newLocation){
        this.location = newLocation;
    }

    willPurchaseFrom(storeLocation, price){
        var decayedBudget = this.budget - (distanceBetween(storeLocation,this.location) / 100); 
        if (decayedBudget >= price){
            return true;
        } else {
            return false;
        } 
    }

    draw() {
        image(this.sprite, 0, 0);
    }

    static generateRandomStudent(){
        return new Student({x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 600)},Math.floor(Math.random() * 10) + 5);
    }
}

// new Student({x: 4, y: 5})
