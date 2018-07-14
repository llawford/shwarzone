import {distanceBetween} from "./utils";

export class Student{
    constructor(location,budget){
        this.location = location; // x and y integers
        this.budget = budget; //max budget per day, should be 5-15
        this.isAlive = true;
    }

    decayDistance = 100;

    die(){
        this.isAlive = false;
    }

    updateLocation(newLocation){
        this.location = newLocation;
    }

    willPurchaseFrom(storeLocation, price){
        var decayedBudget = budget - (distanceBetween(storeLocation,this.location) / 100); 
        if (decayedBudget >= price){
            return true;
        } else {
            return false;
        } 
    }

    static generateRandomStudent(){
        return new Student({x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 600)},Math.floor(Math.random() * 10) + 5);
    }
}

// new Student({x: 4, y: 5})