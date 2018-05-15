import { getAudioContext } from "../context";
import { timeout } from "../interval";
import { synthStore } from "./store/synth.store";
import { panPercentageToValue } from "../pan";
import { numberToArrayLength } from "../../natives/array";
import ogen from "../../generator/ogen";
import { createLookAheadStream } from "../lookahead.stream";
import { adsr } from "../adsr";

export const MAX_VOICES = 16;

export let createSynth = () => {

  let context = getAudioContext();
  let output = context.createGain();
  let voiceNodes = null;
  let volumeNode = null;
  let panNode = null;
  let send1 = null;
  let send2 = null;
  let loopSubscription = false;
  let store = synthStore();

  let init = () => {
    voiceNodes = numberToArrayLength(MAX_VOICES).map(_ => {
      return {
        oscillators: {
          osc1: context.createOscillator(),
          osc2: context.createOscillator()
        },
        gains: {
          amount: context.createGain(),
          amp: context.createGain(),
          filter: context.createBiquadFilter(),
          output: context.createGain()
        }
      };
    });
    volumeNode = context.createGain();
    panNode = context.createPanner();
    send1 = context.createGain();
    send2 = context.createGain();

    //connections
    voiceNodes.forEach(({
      oscillators: {
        osc1,
        osc2,
      },
      gains: {
        amount,
        amp,
        filter,
        output
      }
    }) => {
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(220, context.currentTime);
      osc1.start();
      osc1.connect(amp);
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110, context.currentTime);
      osc2.start();
      osc2.connect(amp);
      amp.connect(filter);
      amp.gain.value = 0;
      filter.connect(amount);
      amount.connect(output);
      output.connect(volumeNode);
    });

    console.log("voiceNodes", voiceNodes);
    volumeNode.connect(panNode);
    panNode.panningModel = "equalpower";
    panNode.setPosition(...panPercentageToValue(50));
    panNode.connect(output);

    createStoreSubscription();
    createLookAheadSubscription();
  };

  let createStoreSubscription = () => {
    store.subscribe(() => {
      let state = store.getState();
    });
  };

  let createLookAheadSubscription = () => {
    //TODO: tidy the way current time is accessed and adsr is changed
    //TODO: Only need to change the controls when the app is playing
    let _adsr = {},
        keyPressed,
        time = context.currentTime;
    loopSubscription = createLookAheadStream(50, 10)
      .map(i => time + (i * 0.01))
      .subscribe(time => {

        let {
          oscillators: {
            osc1,
            osc2
          },
          gains: {
            amount,
            amp,
            filter,
            output
          }
        } = voiceNodes[0];
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(220, time);
        amount.gain.setValueAtTime(1, time);
        amp.gain.setValueAtTime(1, time);
        volumeNode.gain.setValueAtTime(1, time);
        
        // send1.setValueAtTime(1, time);
        // send2.setValueAtTime(1, time);

        // setPosition cannot be set ahead of time
        //panNode;

        _adsr = adsr(keyPressed, 10, { attack: 100, decay: 100, sustain: 10, release: 100 }, _adsr);
        voiceNodes[0].gains.amp.gain.linearRampToValueAtTime(_adsr.value * 0.01, time);
      });
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
    updateConnections(instrument, state);
  };

  let updateConnections = (instrument, state) => {
    //TODO: connect FM etc
  };
  
  let remove = () => {
    context = null;
    loopSubscription.unsubscribe();
  };

  init();

  return {
    update,
    remove,
    outputs: {
      main: output
    }
  }
};