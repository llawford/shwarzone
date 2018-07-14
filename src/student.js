import {distanceBetween} from "./utils";

export class Student{
    constructor(location,budget){
        this.location = location; // x and y integers
        this.budget = budget; //max budget per day, should be 5-15
    }

    decayDistance = 100;

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
}

// new Student({x: 4, y: 5})