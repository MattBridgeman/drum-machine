import { getAudioContext } from "../context";
import { timeout } from "../interval";
import { synthStore } from "./store/synth.store";
import { panPercentageToValue } from "../pan";
import { numberToArrayLength, numberToArrayLengthWithValue } from "../../natives/array";
import ogen from "../../generator/ogen";
import { createLookAheadStream } from "../lookahead.stream";
import { adsr } from "../adsr";
import keyboardMap from "../../keyboard/keyboard.map";

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
  let voiceToKeyMap = numberToArrayLengthWithValue(MAX_VOICES, 0);
  let asdrs = [];
  let keysPressed = [];

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

    volumeNode.connect(panNode);
    panNode.panningModel = "equalpower";
    panNode.setPosition(...panPercentageToValue(50));
    panNode.connect(output);

    //createStoreSubscription();
    createLookAheadSubscription();
  };

  // let createStoreSubscription = () => {
  //   store.subscribe(() => {
  //     let state = store.getState();
  //   });
  // };

  let createLookAheadSubscription = () => {
    //TODO: tidy the way current time is accessed and adsr is changed
    //TODO: Only need to change the controls when the app is playing
    let _adsr = {},
        time = context.currentTime;
    loopSubscription = createLookAheadStream(50, 10)
      .map(i => time + (i * 0.01))
      .subscribe(time => {
        voiceNodes.forEach((voiceNode, i) => {
          let keyPressed = voiceToKeyMap[i];
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
          } = voiceNode;
          let _asdr = asdrs[i] || {};
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(220, time);
          amount.gain.setValueAtTime(1, time);
          amp.gain.setValueAtTime(1, time);
          volumeNode.gain.setValueAtTime(1, time);
          
          asdrs[i] = adsr(keyPressed, 10, { attack: 100, decay: 100, sustain: 10, release: 100 }, _asdr);
          voiceNode.gains.amp.gain.linearRampToValueAtTime(_adsr.value * 0.01, time);
        });
      });
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
    updateConnections(instrument, state);
    updateKeys(instrument, state);
  };

  let updateConnections = (instrument, state) => {
    //TODO: connect FM etc
  };

  let updateKeys = (instrument, state) => {
    let { keys } = state;
    let { machineId } = instrument;
    let { synth } = state;
    let { voices } = synth[machineId];
    keysPressed = keys
      .map(key => keyboardMap[key.keyName])
      .filter(key => !!key)
      .sort((prev, curr) => prev.time - curr.time)
      .filter((key, i) => i < voices);

    //leave all assigned
    voiceToKeyMap
    .filter((key, i) => i < voices)
    .forEach((item, key) => {
      let match = keysPressed.filter(key => item.note === key.note && item.octave === key.octave);
      if(!match.length) {
        voiceToKeyMap[key] = 0;
      };
    });
    keysPressed.forEach(keyPressedItem => {
      let match;
      let availableVoices = [];
      voiceToKeyMap
      .filter((key, i) => i < voices)
      .forEach((item, i) => {
        if(!item) {
          availableVoices = [...availableVoices, i];
        } else {
          let keyMatch = keysPressed.filter(key => item.note === keyPressedItem.note && item.octave === keyPressedItem.octave);
          if(keyMatch.length) {
            match = keyMatch;
          }
        }
      });
      if(!match) {
        voiceToKeyMap[availableVoices[0]] = keyPressedItem;
      }
    });
    console.log(voiceToKeyMap);
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