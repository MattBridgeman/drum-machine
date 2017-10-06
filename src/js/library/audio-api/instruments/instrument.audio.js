import { drumMachine } from "./drum.machine";

export let updateInstrumentAudio = (instruments) => 
  instruments.map(instrument => {
    switch(instrument.type) {
      case "drumMachine":
        return drumMachine(instrument);
      default:
        return;
    }
  });