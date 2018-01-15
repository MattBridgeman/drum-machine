import { UPLOAD_SAMPLE } from "../constants/samples.constants";

export function uploadSample(name, shortName, file){
	return {
		type: UPLOAD_SAMPLE,
		name,
    shortName,
    file
	};
}