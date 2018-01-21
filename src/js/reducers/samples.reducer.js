import { SAMPLES_LOADING, SAMPLES_LOADED, SAMPLES_LOAD_ERROR, UPLOAD_SAMPLE, SAMPLE_UPLOADED, SAMPLE_UPLOAD_ERROR, SAMPLE_UPLOAD_RESET, SAMPLE_UPLOADING, SAMPLE_DELETED } from "../constants/samples.constants";
import { filter } from "../library/natives/object";

//Uploads States: "idle", "loading", "loaded", "error"

let defaultState = {
  state: "idle",
  upload: {
    state: "idle",
    file: undefined
  },
  samples: {
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
        name: action.name,
        shortName: action.shortName,
        path: action.path,
        createdDate: action.createdDate,
      };
      return {
        ...state,
        upload: {
          state: "uploaded"
        },
        samples: {
          ...state.samples,
          [action.userId]: {
            [action.sampleId]: sample,
            ...state.samples[action.userId]
          }
        }
      }
    case SAMPLE_DELETED:
      return {
        ...state,
        samples: {
          ...state.samples,
          [action.userId]: {
            ...filter(state.samples[action.userId], ({
              key, value
            }) => key !== action.id)
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
    case SAMPLE_UPLOAD_ERROR:
      return {
        ...state,
        upload: {
          ...state.upload,
          state: "error"
        }
      }
    case SAMPLE_UPLOADING:
      return {
        ...state,
        upload: {
          ...state.upload,
          state: "uploading"
        }
      }
    case SAMPLE_UPLOAD_RESET:
      return {
        ...state,
        upload: {
          state: "idle",
          file: undefined
        }
      }
    default:
      return state;
  }
}