import {distanceBetween} from "./utils";

export class Student{

    static preload() {
      Student.sprites = [
        loadImage('img/poor kid.png'),
        loadImage('img/middle class kid.png'),
        loadImage('img/rich kid.png')
      ];
      Student.tombstone = loadImage('img/finito.png');
    }

    constructor(location,budget){
        this.location = location; // x and y integers
        this.currentLocation = { ...this.location }; // copy of home location
        this.target = this.location;
        this.budget = budget; //max budget per day, should be 5-15
        this.isAlive = true;
        if(budget > 12){
            this.sprite=Student.sprites[2];
        }
        else if(budget > 8){
            this.sprite=Student.sprites[1];
        }
        else {
            this.sprite = Student.sprites[0];
        }
    }

    decayDistance = 100;

    goHome() {
        this.location.x += Math.random() * 200 - 100;
        this.location.y += Math.random() * 200 - 100;
        if (this.location.x < 0) this.location.x = 30*25;
        if (this.location.x > 30 * 25) this.location.x = 0;
        if (this.location.y < 0) this.location.y = 30*20;
        if (this.location.y > 30 * 20) this.location.y = 0;
        this.target = this.location;
    }

    goToShop(shop) {
        this.target = shop.location;
    }

    tick() {
        // Advance towards target
        this.currentLocation.x += (this.target.x - this.currentLocation.x) / 12;
        this.currentLocation.y += (this.target.y - this.currentLocation.y) / 12;
    }

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
        image(
            this.isAlive ? this.sprite : Student.tombstone,
            this.currentLocation.x - this.sprite.width/2,
            this.currentLocation.y - this.sprite.height/2
        );
    }

    static generateRandomStudent(){
        return new Student({x: Math.floor(Math.random() * 750), y: Math.floor(Math.random() * 600)},Math.floor(Math.random() * 10) + 5);
    }
}

// new Student({x: 4, y: 5})
