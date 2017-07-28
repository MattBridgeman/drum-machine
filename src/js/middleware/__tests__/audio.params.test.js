import React from "react";
import { updateAudioParams } from "../audio.params";
import { newSourceNodes } from "../../actions/audio.context.actions";
import { GlobalAudioContext } from "../../library/test-helpers/stubs/audio.api";
import { expect } from "chai";
import td from "testdouble";

describe("Audio Params", () => {
  it("passes all actions to next", () => {
    
    let next = td.function();
    let state = {
      channels: [],
      reverb: {
        decay: 1,
        seconds: 1
      }
    };
    let mockStore = {
      getState: () => state
    };
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes([]));
    td.verify(next(newSourceNodes([])));
  });
  it("sets gains to correct value", () => {
    
    let next = td.function();
    let state = {
      channels: [{
        mute: false,
        solo: false,
        pan: 50,
        volume: 100
      }],
      reverb: {
        decay: 100,
        seconds: 100
      }
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes(sourceNodes));
    expect(sourceNodes[0].volume.gain.value).to.equal(1);
    expect(sourceNodes[0].master.gain.value).to.equal(1);
  });
  it("mutes channel", () => {
    
    let next = td.function();
    let state = {
      channels: [{
        mute: true,
        solo: false,
        pan: 50,
        volume: 100
      }],
      reverb: {
        decay: 100,
        seconds: 100
      }
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes(sourceNodes));
    expect(sourceNodes[0].master.gain.value).to.equal(0);
  });
  it("solos a single channel, muting the other", () => {
    
    let next = td.function();
    let state = {
      channels: [{
        mute: false,
        solo: false,
        pan: 50,
        volume: 100
      },{
        mute: false,
        solo: true,
        pan: 50,
        volume: 100
      }],
      reverb: {
        decay: 100,
        seconds: 100
      }
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    },{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes(sourceNodes));
    expect(sourceNodes[0].master.gain.value).to.equal(0);
    expect(sourceNodes[1].master.gain.value).to.equal(1);
  });
  it("sets pan to equally left and right", () => {
    let next = td.function();
    let state = {
      channels: [{
        mute: false,
        solo: false,
        pan: 50,
        volume: 100
      }],
      reverb: {
        decay: 100,
        seconds: 100
      }
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes(sourceNodes));
    td.verify(sourceNodes[0].pan.setPosition(0, 0, 1));
  });
  it("sets reverb seconds and decay", () => {
    let next = td.function();
    let state = {
      channels: [{
        mute: false,
        solo: false,
        pan: 50,
        volume: 100
      }],
      reverb: {
        decay: 100,
        seconds: 100
      }
    };
    let mockStore = {
      getState: () => state
    };
    let sourceNodes = [{
      master: {
        gain: {
          value: 0
        }
      },
      volume: {
        gain: {
          value: 0
        }
      },
      pan: {
        setPosition: td.function()
      },
      reverbNode: {
        decay: 0,
        seconds: 0
      }
    }];
    let nextAction = updateAudioParams(mockStore)(next);
    nextAction(newSourceNodes(sourceNodes));
    expect(sourceNodes[0].reverbNode.decay).to.equal(2);
    expect(sourceNodes[0].reverbNode.seconds).to.equal(2);
  });
});