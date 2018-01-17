import { SAMPLES_LOADING, SAMPLES_LOADED, SAMPLES_LOAD_ERROR, UPLOAD_SAMPLE, SAMPLE_UPLOADED } from "../constants/samples.constants";

//Uploads States: "idle", "loading", "loaded", "error"

let defaultState = {
  state: "idle",
  upload: {
    state: "idle",
    file: undefined
  },
  samples: {
    //userId: {}
    //TODO: Remove dummy data
    "WmXoGltJLeYoDMHJJEcSY6jo3Bz1": {
      "sfdsfdsf": {
        name: "Logic stab",
        path: "https://firebasestorage.googleapis.com/v0/b/drum-machine-12c62.appspot.com/o/public%2Fsamples%2F909%2Frd01.WAV?alt=media&token=1ce6c343-51e7-4c16-acbf-f03f4bdf6ee3",
        shortName: "LS"
      }
    }
  }
};

export default function samples(state = defaultState, action) {
  switch (action.type) {
    case SAMPLES_LOADING:
      return {
        ...state,
        state: "loading"
      }
    case SAMPLES_LOADED:
      return {
        ...state,
        state: "loaded",
        samples: {
          ...state.samples,
          [action.userId]: action.samples
        }
      }
    case SAMPLE_UPLOADED:
      let sample = {
        [action.name]: action.name,
        [action.shortName]: action.shortName,
        [action.path]: action.path,
        [action.createdDate]: action.createdDate,
      };
      return {
        ...state,
        samples: {
          ...state.samples,
          [action.userId]: {
            ...state[action.userId].samples,
            [action.sampleId]: sample
          }
        }
      }
    case SAMPLES_LOAD_ERROR:
      return {
        ...state,
        state: "error",
        error: action.error
      }
    case UPLOAD_SAMPLE:
      return {
        ...state,
        upload: {
          state: "idle",
          file: {
            name: action.name,
            shortName: action.shortName,
            file: action.file
          }
        }
      }
    default:
      return state;
  }
}