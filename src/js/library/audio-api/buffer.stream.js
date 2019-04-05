import { Observable } from "rxjs";
import { buffersSinceId } from "./buffer";
import { last } from "../natives/array";

let { create } = Observable;


export let createBufferStream = (onUpdate) => {
  let lastBufferId;
  return create(observer => {
    onUpdate.subscribe((buffer) => {
      if(!buffer.length) {
        lastBufferId = undefined;
      }
      let buffers = lastBufferId !== undefined ? buffersSinceId(lastBufferId, buffer) : buffer;
      if(buffers.length) {
        lastBufferId = last(buffers).id;
        observer.next(buffers);
      }
    });
  
    return () => null;
  });
};