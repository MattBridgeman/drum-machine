import { UPLOAD_SAMPLE, SAMPLE_UPLOADED } from "../constants/samples.constants";

export function uploadSample(name, shortName, file){
	return {
		type: UPLOAD_SAMPLE,
		name,
    shortName,
    file
	};
};

export function newSampleUploaded(name, shortName, path, createdDate){
	return {
		type: SAMPLE_UPLOADED,
		name,
    shortName,
    path,
    createdDate
	};
};