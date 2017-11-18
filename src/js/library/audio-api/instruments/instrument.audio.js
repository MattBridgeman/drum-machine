import { createDrumMachine } from "./drum.machine";
import { createReverb } from "./reverb";
import { createMaster } from "./master";
import { objectToArrayWithKeyValue } from "../../natives/array";

export let cache = {};

export let updateInstrumentAudio = (state) => {
  let idCache = {};
  let { instruments } = state;
  let instrumentNodes = instruments.map(instrument => {
    let { id, type } = instrument;
    let item = cache[id];
    if(item) return item;
    let machine;
    switch(type) {
      case "drumMachine":
        machine = createDrumMachine();
        break;
      case "reverb":
        machine = createReverb();
        break;
      case "master":
        machine = createMaster();
        break;
      default:
        machine = null;
        break;
    }
    return {
      instrument,
      machine
    };
  });

  //update nodes
  instrumentNodes.forEach(({ instrument, machine }) => {
    cache = {
      ...cache,
      [instrument.id]: {
        instrument,
        machine
      }
    };
    idCache[instrument.id] = true;
    if(machine.update) {
      machine.update(instrument, state);
    }
  });

  //remove nodes
  let cacheArray = objectToArrayWithKeyValue(cache);
  cacheArray.forEach(item => {
    let { key, value } = item;
    let { machine } = value;
    if(!idCache[key] && machine.remove) {
      machine.remove();
      clearCacheById(key);
    }
  });

  return instrumentNodes;
};

export let clearCache = () => {
  cache = {};
};

export let clearCacheById = id => {
  cache = objectToArrayWithKeyValue(cache)
    .filter(({ key }) => key === id)
    .reduce((prev, { key: value }) => ({
      ...prev,
      [key]: value
    }), {});
};