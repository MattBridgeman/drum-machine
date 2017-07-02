import { getSegmentsInTimespan, getSegmentTimeInSeconds } from "./tempo";
import { last, numberToArrayLength } from "../natives/array";
import { normalisedIndex } from "./play.state";

export const LOOK_AHEAD_IN_SECONDS = 0.25;
export const BUFFER_DELAY_IN_SECONDS = 0.1;
export const MAX_KEEP_STALE_BUFFER_IN_SECONDS = 5;

export function segmentsToSchedule(previousState, currentTime, state) {
  let { playState, tempo } = state;
  let currentLookAhead = currentTime + LOOK_AHEAD_IN_SECONDS;
  let segmentTime = getSegmentTimeInSeconds(tempo.beatsPerMinute, tempo.segmentsPerBeat);
  let segmentsToBuffer = getSegmentsInTimespan(LOOK_AHEAD_IN_SECONDS, segmentTime);
  let segmentsToBufferAsArray = numberToArrayLength(segmentsToBuffer);
  let lastBuffer = last(previousState);
  
  if(!lastBuffer || lastBuffer.time < currentLookAhead) {
    return segmentsToBufferAsArray
      .map(segmentIndex => ({
        index: lastBuffer ? normalisedIndex(playState, tempo, lastBuffer.index + (segmentIndex + 1)) : segmentIndex,
        time: lastBuffer ? lastBuffer.time + ((1 + segmentIndex) * segmentTime) : currentTime + (segmentIndex * segmentTime) + BUFFER_DELAY_IN_SECONDS
      }));
  }
  return [];
}

//do clearing of frames that have passed
// previousState.filter(({time, id}) => 
//   time + MAX_KEEP_STALE_BUFFER_IN_SECONDS <= context.currentTime
// ).forEach(({id}) => dispatch(bufferActions.clearBufferSegment(id)));