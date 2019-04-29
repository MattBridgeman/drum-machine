export const CHANGE_INSTRUMENT = "CHANGE_INSTRUMENT";
export const ON_NEW_INSTRUMENT = "ON_NEW_INSTRUMENT";
export const DELETE_INSTRUMENT = "DELETE_INSTRUMENT";


export const SELECTABLE_INSTRUMENTS = [
  "drumMachine",
  "synth"
];

export const INSTRUMENTS_MAP = {
  drumMachine: {
    className: "drum-machine",
    friendlyName: "Drum Machine"
  },
  synth: {
    className: "synth",
    friendlyName: "Synth Machine"
  }
};