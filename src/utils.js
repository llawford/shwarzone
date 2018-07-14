export function distanceBetween(location1, location2){
    return Math.sqrt(Math.pow((location1.x - location2.x),2),Math.pow((location1.y,location2.y),2));
}
