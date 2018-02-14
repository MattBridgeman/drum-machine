import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
let { range, interval, merge } = Observable;

export let createLookAheadStream = (lookAheadInMs, resolutionInMs) => {
  let steps = Math.floor(lookAheadInMs / resolutionInMs);
  let lookAheadStream = range(1, steps);
  let bufferStream = interval(lookAheadInMs)
    .pipe(map(val => val + 1))
    .concatMap(val =>
      range(1,steps).pipe(map(i => (val * steps) + i))
    );
  
  return merge(lookAheadStream, bufferStream);
};