import { getAudioContext } from "../context";
import { timeout } from "../interval";
import { panPercentageToValue } from "../pan";
import { numberToArrayLength, numberToArrayLengthWithValue, updateValue } from "../../natives/array";
import ogen from "../../generator/ogen";
import { createLookAheadStream } from "../lookahead.stream";
import { adsr } from "../adsr";
import { keyboardMap, keyboardArray, keyboardFrequencies, keyTranspose } from "../../keyboard";
import { normaliseValue } from "../../natives/numbers";

export const MAX_VOICES = 8;

export let createSynth = () => {

  let context = getAudioContext();
  let output = context.createGain();
  let voiceNodes = null;
  let volumeNode = null;
  let panNode = null;
  let send1 = null;
  let send2 = null;
  let loopSubscription = false;
  let voiceToKeyMap = numberToArrayLengthWithValue(MAX_VOICES, 0);
  let asdrs = numberToArrayLengthWithValue(MAX_VOICES, {
    phase: "release"
  });
  let keysPressed = [];
  let voices = MAX_VOICES;
  let availableVoice = 0;
  let state = {};

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

    createLookAheadSubscription();
  };

  let createLookAheadSubscription = () => {
    //TODO: tidy the way current time is accessed and adsr is changed
    let _adsr = {},
        time = context.currentTime;
    loopSubscription = createLookAheadStream(50, 10)
      .map(i => time + (i * 0.01))
      .subscribe(time => {
        voiceNodes
        .forEach((voiceNode, i) => {
          if(!state.oscillators) return;
          let key = voiceToKeyMap[i];
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
          let { note = 0, octave: keyOctave = 0 } = key || {};
          let noteIndex = keyboardArray.indexOf(note);
          let {
            oscillators: {
              osc1: {
                waveType: osc1WaveType,
                octave: osc1Octave,
                semitone: osc1Semitone,
                cent: osc1Cent
              },
              osc2: {
                waveType: osc2WaveType,
                octave: osc2Octave,
                semitone: osc2Semitone,
                cent: osc2Cent
              }
            },
            envelopes: {
              amp: {

              }
            }
          } = state;
          //set wavetype
          if(osc1.type != osc1WaveType) {
            osc1.type = osc1WaveType;
          }
          if(osc2.type != osc2WaveType) {
            osc2.type = osc2WaveType;
          };
          //set frequency
          let osc1keyIndex = normaliseValue((keyboardArray.length * (keyOctave + osc1Octave) + noteIndex), 0, 83);
          let osc2keyIndex = normaliseValue((keyboardArray.length * (keyOctave + osc2Octave) + noteIndex), 0, 83);
          let osc1frequency = keyboardFrequencies[osc1keyIndex];
          let osc2frequency = keyboardFrequencies[osc2keyIndex];
          osc1frequency += (osc1Semitone * osc1frequency * keyTranspose.semitone) + (osc1Cent * osc1frequency * keyTranspose.cent);
          osc2frequency += (osc2Semitone * osc2frequency* keyTranspose.semitone) + (osc2Cent * osc2frequency * keyTranspose.cent);
          osc1.frequency.setValueAtTime(osc1frequency, time);
          osc2.frequency.setValueAtTime(osc2frequency, time);
          amount.gain.setValueAtTime(1, time);
          amp.gain.setValueAtTime(1, time);
          volumeNode.gain.setValueAtTime(1, time);
          
          //set amp
          asdrs = updateValue(asdrs, i, adsr(key && !key.released, 10, { attack: 0, decay: 0, sustain: 100, release: 100 }, asdrs[i]));
          voiceNode.gains.amp.gain.linearRampToValueAtTime(asdrs[i].value * 0.01, time);
        });
      });
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    let currentSynth = synth[machineId];
    updateConnections(instrument, state);
    updateKeys(instrument, state);
    updateState(instrument, state);
  };

  let updateState = (instrument, newState) => {
    let { keys } = newState;
    let { machineId } = instrument;
    let { synth } = newState;
    let synthState = synth[machineId];
    state = synthState;
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
      .sort((prev, curr) => curr.time - prev.time)
      .filter((key, i) => i < voices);

    //update voice key map
    //remove keys which are no longer pressed
    //leave all assigned pressed keys alone
    voiceToKeyMap = voiceToKeyMap
    .filter((key, i) => i < voices)
    .map((item, key) => {
      let match = keysPressed.filter(key => item.note === key.note && item.octave === key.octave);
      if(!match.length) {
       return {
         ...item,
         released: true
       };
      } else {
        return item;
      }
    });

    //assign new keys to a voice
    keysPressed.forEach(keyPressedItem => {
      let match;
      voiceToKeyMap
      .filter((key, i) => i < voices)
      .forEach((item, i) => {
        if(item) {
          let keyMatch = keysPressed.filter(key => item.note === keyPressedItem.note && item.octave === keyPressedItem.octave && !item.released);
          if(keyMatch.length) {
            match = keyMatch;
          }
        }
      });
      if(!match) {
        ++availableVoice;
        if(availableVoice >= voices) {
          availableVoice = 0;
        }
        voiceToKeyMap = updateValue(voiceToKeyMap, availableVoice, keyPressedItem);
        //reset phase to attack for any new keys
        asdrs = updateValue(asdrs, availableVoice, {
          ...asdrs[availableVoice],
          phase: 'attack'
        });
      }
    });
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