import { UPLOAD_SAMPLE, SAMPLE_UPLOADED, SAMPLES_LOADED, SAMPLE_UPLOAD_ERROR, SAMPLE_UPLOAD_RESET, SAMPLE_UPLOADING, DELETE_SAMPLE, SAMPLE_DELETED, SAMPLE_DELETE_ERROR } from "../constants/samples.constants";

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

export function sampleUploading(){
  return {
    type: SAMPLE_UPLOADING
  };
};

export function samplesUploadError(){
  return {
    type: SAMPLE_UPLOAD_ERROR
  };
};

export function samplesUploadReset(){
  return {
    type: SAMPLE_UPLOAD_RESET
  };
};

export function deleteSample(userId, id){
  return {
    type: DELETE_SAMPLE,
    userId,
    id
  };
};

export function sampleDeleted(userId, id){
  return {
    type: SAMPLE_DELETED,
    userId,
    id
  };
};

export function sampleDeleteError(userId, id){
  return {
    type: SAMPLE_DELETE_ERROR,
    userId,
    id
  };
};