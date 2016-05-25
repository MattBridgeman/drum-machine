export function lengthOfLine(pointa, pointb){
    return Math.sqrt((Math.pow(pointa.x - pointb.x, 2) + Math.pow(pointa.y - pointb.y, 2)));
}