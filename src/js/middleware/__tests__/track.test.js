import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { track, isNewTrack } from "../track";
import { timeout } from "../../library/audio-api/interval";
import { NEW_TRACK_LOADING, LOAD_DEFAULT_TRACK, NEW_TRACK_LOADED, TRACK_SAVE, NEW_TRACK_SAVE } from "../../constants/track.constants";
import * as db from "../../library/firebase/db";
import configureTestStore from "../../store/test.store";
import { getPromiseMock } from "../../library/test-helpers/mocks/promise";
import { NEW_NOTIFICATION } from "../../constants/notifications.constants";

describe("Track", () => {
  it("passes 'next' onwards for all action types", () => {
    let store = configureTestStore();
    let next = td.function();
    let newAction = track(store)(next);
    newAction({type: "A_RANDOM_ACTION"});
    td.verify(next({type: "A_RANDOM_ACTION"}));
    td.reset();
  });
  it("calls action of type newTrackLoading and loadDefaultTrack if no track is loaded and there's no track id", () => {
    let get = cb => {
      let ret = {
        then: cb => {
          cb();
          return ret;
        }
      }
      return ret;
    };
    td.replace(timeout, "get", get);
    let state = {
      router: {
        location: {
          pathname: "/"
        }
      },
      track: {
        trackId: undefined,
        state: "idle"
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = track(store)(next);
    newAction({
      type: "A_RANDOM_ACTION"
    });
    td.verify(next({
      type: "A_RANDOM_ACTION"
    }));
    td.verify(next({
      type: NEW_TRACK_LOADING,
      trackId: "default",
      userId: undefined
    }));
    td.verify(next({
      type: LOAD_DEFAULT_TRACK
    }));
    td.reset();
  });
  it("calls newTrackLoading, loadTrack and newTrackLoaded if no track is loaded and there is a track id", () => {
    let { promise, flush } = getPromiseMock();
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
    let loadTrack = td.function();
    td.when(loadTrack(td.matchers.anything(), td.matchers.anything())).thenReturn(promise);

    td.replace(timeout, "get", get);
    td.replace(db, "loadTrack", loadTrack);
    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
        }
      },
      track: {
        trackId: undefined,
        state: "idle"
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = track(store)(next);
    
    newAction({
      type: "A_RANDOM_ACTION"
    });
    flush();

    td.verify(next({
      type: "A_RANDOM_ACTION"
    }));
    td.verify(next({
      type: NEW_TRACK_LOADING,
      trackId: "234",
      userId: "123"
    }));
    td.verify(next({
      type: NEW_TRACK_LOADED
    }));
    td.verify(loadTrack("123", "234"));
    td.reset();
  });

  it("creates a notification if there's an error loading track", () => {
    let { promise, flush, flushErrors } = getPromiseMock();
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
    let loadTrack = td.function();
    td.when(loadTrack(td.matchers.anything(), td.matchers.anything())).thenReturn(promise);

    td.replace(timeout, "get", get);
    td.replace(db, "loadTrack", loadTrack);
    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
        }
      },
      track: {
        trackId: undefined,
        state: "idle"
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = track(store)(next);
    
    newAction({
      type: "A_RANDOM_ACTION"
    });
    flushErrors();

    td.verify(next({
      type: NEW_NOTIFICATION,
      value: "Error loading track",
      notificationType: td.matchers.anything()
    }));
    td.verify(loadTrack("123", "234"));
    td.reset();
  });
  
  it("new track is saved when track save action is fired", () => {
    let trackId = "12345678";
    let { promise, flush, flushErrors } = getPromiseMock(trackId);
    let get = cb => {
      let ret = {
        then: cb => {
          cb(trackId);
          return ret;
        }
      }
      return ret;
    };

    //mocks
    let getNewTrackKey = td.function();
    td.when(getNewTrackKey(td.matchers.anything())).thenReturn(promise);

    let saveTrack = td.function();
    td.when(saveTrack(td.matchers.anything())).thenReturn(promise);

    td.replace(timeout, "get", get);
    td.replace(db, "getNewTrackKey", getNewTrackKey);
    td.replace(db, "saveTrack", saveTrack);

    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
        }
      },
      track: {
        trackId: undefined,
        state: "idle"
      },
      auth: {
        user: {
          uid: "1234"
        }
      },
      drumMachine: {
        0: {
          currentBankIndex: 0,
          swing: 0,
          channels: []
        }
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = track(store)(next);
    
    newAction({
      type: TRACK_SAVE
    });
    flush();

    td.verify(next({
      type: TRACK_SAVE
    }));
    td.verify(next({
      type: NEW_TRACK_SAVE,
      trackId: "12345678",
      userId: "1234"
    }));
    td.verify(getNewTrackKey("1234"));
    td.verify(saveTrack("1234", "12345678", {
      connections: [],
      drumMachine: {0: {currentBankIndex: 0, swing: 0, channels: []}},
      instruments: [],
      reverb: {},
      sounds: {},
      tempo: {beatsPerMinute: 120, beatsPerBar: 4, segmentsPerBeat: 4},
      track: {trackId: "12345678", state: "idle", userId: "1234"}
    }))
    td.reset();
  });
  
  it("existing track is saved when track save action is fired", () => {
    let { promise, flush, flushErrors } = getPromiseMock();
    let get = cb => {
      let ret = {
        then: cb => {
          cb(trackId);
          return ret;
        }
      }
      return ret;
    };

    let saveTrack = td.function();
    td.when(saveTrack(td.matchers.anything(), td.matchers.anything(), td.matchers.anything())).thenReturn(promise);

    td.replace(timeout, "get", get);
    td.replace(db, "saveTrack", saveTrack);

    let state = {
      router: {
        location: {
          pathname: "/users/123/tracks/234"
        }
      },
      track: {
        trackId: "12345678",
        userId: "1234",
        state: "idle"
      },
      auth: {
        user: {
          uid: "1234"
        }
      },
      drumMachine: {
        0: {
          currentBankIndex: 0,
          swing: 0,
          channels: []
        }
      }
    };
    let store = {
      getState: () => state
    }
    let next = td.function();
    let newAction = track(store)(next);
    
    newAction({
      type: TRACK_SAVE
    });
    flush();

    td.verify(next({
      type: TRACK_SAVE
    }));
    td.verify(saveTrack("1234", "12345678", {
      connections: [],
      drumMachine: {0: {currentBankIndex: 0, swing: 0, channels: []}},
      instruments: [],
      reverb: {},
      sounds: {},
      tempo: {beatsPerMinute: 120, beatsPerBar: 4, segmentsPerBeat: 4},
      track: {trackId: "12345678", state: "idle", userId: "1234"}
    }))
    td.reset();
  });

  it("returns default track when the route is a track, no track is loaded and there isn't a track loading", () => {
    let state = {
      router: {
        location: {
          pathname: "/"
        }
      },
      track: {
        trackId: undefined,
        state: "idle"
      },
      auth: {
        user: {
          uid: "1234"
        }
      },
      drumMachine: {
        0: {
          currentBankIndex: 0,
          swing: 0,
          channels: []
        }
      }
    };
    let store = {
      getState: () => state
    };
    let next = td.function();

    let action = {
      type: "RANDOM"
    };

    let newTrack = isNewTrack(store)(next)(action);
    
    expect(newTrack.newTrackId).to.equal("default");
    expect(newTrack.newUserId).to.equal(undefined);
  });
});