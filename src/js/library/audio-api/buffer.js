import { getSegmentsInTimespan, getSegmentTimeInSeconds } from "./tempo";
import { getSegmentTimeInMilliseconds } from "./tempo";
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
      .reduce((prev, curr, index) => {
        let lastSegment = last(prev);
        return [...prev, {
          index: normalisedIndex(playState, tempo, lastSegment.index + 1),
          time: lastSegment.time + (getSegmentTimeInMilliseconds(tempo.beatsPerMinute, tempo.segmentsPerBeat, lastSegment.index + 1, tempo.swing) / 1000)
        }];
      }, [lastBuffer || {
        index: 0,
        time: currentTime + BUFFER_DELAY_IN_SECONDS
      }])
      .filter((segment, index) => lastBuffer ? index !== 0 : true);
  }
  return [];
}

//do clearing of frames that have passed
// previousState.filter(({time, id}) => 
//   time + MAX_KEEP_STALE_BUFFER_IN_SECONDS <= context.currentTime
// ).forEach(({id}) => dispatch(bufferActions.clearBufferSegment(id)));