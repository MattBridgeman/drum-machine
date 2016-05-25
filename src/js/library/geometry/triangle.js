export function angleInRightTriangle(adjacent, hypotenuse) {
	return Math.acos(adjacent / hypotenuse);
}

export function angleInRightTriangleInDegrees(adjacent, hypotenuse) {
	let radians = angleInRightTriangle(adjacent, hypotenuse);
	return radiansToDegrees(radians);
}

export function radiansToDegrees(radians){
	return radians * (180/Math.PI);
}

export function angleFromHorizontalGivenXandY(angle, { x, y }){
	if(x < 0 && y > 0){
		return angle;
	} else if (x > 0 && y > 0) {
		return 180 - angle;
	} else if (x > 0 && y < 0) {
		return 180 + angle;
	} else if(x < 0 && y < 0) {
		return 360 - angle;
	}
}