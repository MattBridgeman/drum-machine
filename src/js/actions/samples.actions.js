import { UPLOAD_SAMPLE, SAMPLE_UPLOADED, SAMPLES_LOADED } from "../constants/samples.constants";

export function uploadSample(name, shortName, file){
	return {
		type: UPLOAD_SAMPLE,
		name,
    shortName,
    file
	};
};

export function newSampleUploaded({
  name,
  shortName,
  path,
  createdDate,
  sampleId,
  userId
}){
	return {
		type: SAMPLE_UPLOADED,
		name,
    shortName,
    path,
    createdDate,
    sampleId,
    userId
	};
};

export function samplesLoaded(userId, samples){
  return {
    type: SAMPLES_LOADED,
    userId,
    samples
  };
};