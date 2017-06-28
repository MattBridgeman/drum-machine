export function normalisedIndex(playState, tempo, index) {
  let {
    looping
  } = playState;
  let {
    beatsPerBar,
	  segmentsPerBeat,
  } = tempo;
  let barLength = beatsPerBar * segmentsPerBeat;
  if(looping){
    return index % barLength;
  }
  return index;
};