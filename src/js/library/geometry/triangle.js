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