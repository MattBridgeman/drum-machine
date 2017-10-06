import { drumMachine } from "./drum.machine";

export let getInstrumentAudio = (instruments) => 
  instruments.map(instrument => {
    switch(instrument.type) {
      case "drumMachine":
        return drumMachine(instrument);
      default:
        return;
    }
  });