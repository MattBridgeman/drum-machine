import { getSegmentsInTimespan, getSegmentTimeInSeconds } from "./tempo";
import { getSegmentTimeInSeconds } from "./tempo";
import { last, numberToArrayLength } from "../natives/array";
import { normalisedIndex } from "./play.state";

export const LOOK_AHEAD_IN_SECONDS = 0.25;
export const BUFFER_DELAY_IN_SECONDS = 0.1;
export const MAX_KEEP_STALE_BUFFER_IN_SECONDS = 2;

export function segmentsToSchedule(currentTime, state) {
  let { playState, tempo, buffer } = state;
  let currentLookAhead = currentTime + LOOK_AHEAD_IN_SECONDS;
  let segmentTime = getSegmentTimeInSeconds(tempo.beatsPerMinute, tempo.segmentsPerBeat);
  let segmentsToBuffer = getSegmentsInTimespan(LOOK_AHEAD_IN_SECONDS, segmentTime);
  let segmentsToBufferAsArray = numberToArrayLength(segmentsToBuffer);
  let lastBuffer = last(buffer);
  if(!lastBuffer || lastBuffer.time < currentLookAhead) {
    return segmentsToBufferAsArray
      .reduce((prev, curr, index) => {
        let lastSegment = last(prev);
        return [...prev, {
          index: normalisedIndex(playState, tempo, lastSegment.index + 1),
          time: lastSegment.time + getSegmentTimeInSeconds(tempo.beatsPerMinute, tempo.segmentsPerBeat)
        }];
      }, [lastBuffer || {
        index: 0,
        time: currentTime + BUFFER_DELAY_IN_SECONDS
      }])
      .filter((segment, index) => lastBuffer ? index !== 0 : true);
  }
  return [];
};

export let segmentsToClear = (previousState, currentTime) =>
  previousState.filter(({time}) => time + MAX_KEEP_STALE_BUFFER_IN_SECONDS <= currentTime);

export let buffersSinceId = (id, buffer) => {
  if(id === undefined) return buffer;
  let buffers = buffer.reduce((prev, curr) => {
    let shouldAdd = prev.shouldAdd || curr.id === id;
    let { items } = prev;
    if(prev.shouldAdd) {
      items = [
        ...items,
        curr
      ];
    }
    return {
      items,
      shouldAdd
    }
  }, {
    items: [],
    shouldAdd: false
  });
  return buffers.items;
};