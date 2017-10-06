import { drumMachine } from "./drum.machine";
import { objectToArrayWithKeyValue } from "../../natives/array";

export let cache = {};

export let updateInstrumentAudio = (state) => {
  let idCache = {};
  let { instruments } = state;
  instruments.map(instrument => {
    let { id, type } = instrument;
    let item = cache[id];
    if(item) return item;
    let machine;
    switch(type) {
      case "drumMachine":
        machine = drumMachine();
        break;
      default:
        machine = null;
        break;
    }
    return {
      instrument,
      machine
    };
  })
  .forEach(({ instrument, machine }) => {
    let item = cache[instrument.id] = {
      instrument,
      machine
    };
    idCache[instrument.id] = true;
    machine.update(instrument, state);
  });

  let cacheArray = objectToArrayWithKeyValue(cache);
  cacheArray.forEach(item => {
    let { key, value } = item;
    let { machine } = value;
    console.log(value);
    if(!idCache[key]) {
      machine.delete();
    }
  });
};
  