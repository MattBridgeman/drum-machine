import { samplesMiddleware } from "../samples";
import { expect } from "chai";
import td from "testdouble";
import { timeout } from "../../library/audio-api/interval";
import configureTestStore from "../../store/test.store";
import * as db from "../../library/firebase/db";
import { getPromiseMock } from "../../library/test-helpers/mocks/promise";
import { UPLOAD_SAMPLE, SAMPLE_UPLOADING, SAMPLE_UPLOADED, SAMPLE_DELETED, DELETE_SAMPLE } from "../../constants/samples.constants";

describe("Samples", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = samplesMiddleware(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
  });

  it("calls sampleUploading, uploadUserSample then newSampleUploaded on UPLOAD_SAMPLE action", () => {
    let sample = {
      name: "sample name",
      shortName: "SN",
      userId: "123"
    };
    let { promise, flush } = getPromiseMock(sample);
    let get = cb => {
      let ret = {
        then: cb => {
          cb();
          return ret;
        }
      }
      return ret;
    };

    //mocks
    let uploadUserSample = td.function();
    td.when(uploadUserSample(td.matchers.anything(), td.matchers.anything(), td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenReturn(promise);

    td.replace(timeout, "get", get);
    td.replace(db, "uploadUserSample", uploadUserSample);
    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
        }
      },
      track: {
        trackId: "234",
        state: "idle"
      },
      auth: {
        user: {
          uid: "123"
        }
      },
      samples: {
        upload: {
          state: "idle"
        }
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = samplesMiddleware(store)(next);
    
    newAction({
      type: UPLOAD_SAMPLE,
      name: "sample name",
      shortName: "SN",
      file: {
        name: "samplename.wav"
      }
    });
    flush();
    td.verify(next({
      type: SAMPLE_UPLOADING
    }));
    td.verify(next({
      type: UPLOAD_SAMPLE,
      name: "sample name",
      shortName: "SN",
      file: {
        name: "samplename.wav"
      }
    }));
    td.verify(next({
      type: SAMPLE_UPLOADED,
      name: "sample name",
      shortName: "SN",
      path: undefined,
      createdDate: undefined,
      sampleId: undefined,
      userId: "123"
    }));
    td.reset();
  });

  it("calls deleteUserSample then sampleDeleted on DELETE_SAMPLE action", () => {
    let sample = {
      name: "sample name",
      shortName: "SN",
      userId: "123"
    };
    let { promise, flush } = getPromiseMock(sample);
    let get = cb => {
      let ret = {
        then: cb => {
          cb();
          return ret;
        }
      }
      return ret;
    };

    //mocks
    let deleteUserSample = td.function();
    td.when(deleteUserSample(td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenReturn(promise);

    td.replace(timeout, "get", get);
    td.replace(db, "deleteUserSample", deleteUserSample);
    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
        }
      },
      track: {
        trackId: "234",
        state: "idle"
      },
      auth: {
        user: {
          uid: "123"
        }
      },
      samples: {
        upload: {
          state: "idle"
        }
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = samplesMiddleware(store)(next);
    
    newAction({
      type: DELETE_SAMPLE,
      name: "sample name",
      shortName: "SN",
      userId: "123",
      id: "234"
    });
    flush();
    td.verify(next({
      type: SAMPLE_DELETED,
      userId: "123",
      id: "234"
    }));
    td.reset();
  });
});