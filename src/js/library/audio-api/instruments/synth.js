import { getAudioContext } from "../context";
import { timeout } from "../interval";
import { panPercentageToValue } from "../pan";
import { numberToArrayLength, numberToArrayLengthWithValue, updateValue } from "../../natives/array";
import ogen from "../../generator/ogen";
import { createLookAheadStream } from "../lookahead.stream";
import { adsr } from "../adsr";
import { keyboardMap, keyboardArray, keyboardFrequencies, keyTranspose } from "../../keyboard";
import { normaliseValue } from "../../natives/numbers";
import { filterPercentageToValue } from "../filter";

export const MAX_VOICES = 8;

export let createSynth = () => {

  let context = getAudioContext();
  let output = context.createGain();
  let voiceNodes = null;
  let volumeNode = null;
  let panNode = null;
  let send1Node = null;
  let send2Node = null;
  let preLfoNode = null;
  let lfo1Node = null;
  let lfo1WetNode = null;
  let lfo1DryNode = null;
  let lfo2Node = null;
  let lfo2WetNode = null;
  let lfo2DryNode = null;
  let loopSubscription = false;
  let voiceToKeyMap = numberToArrayLengthWithValue(MAX_VOICES, 0);
  let ampAsdrs = numberToArrayLengthWithValue(MAX_VOICES, {
    phase: "release"
  });
  let filterAsdrs = numberToArrayLengthWithValue(MAX_VOICES, {
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
          osc1: {
            osc: context.createOscillator(),
            amount: context.createGain()
          },
          osc2: {
            osc: context.createOscillator(),
            amount: context.createGain()
          }
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
    send1Node = context.createGain();
    send2Node = context.createGain();
    preLfoNode = context.createGain();
    lfo1Node = context.createOscillator();
    lfo1DryNode = context.createGain();
    lfo1WetNode = context.createGain();
    lfo2Node = context.createOscillator();
    lfo2DryNode = context.createGain();
    lfo2WetNode = context.createGain();

    //connections
    voiceNodes.forEach(({
      oscillators: {
        osc1: {
          osc: osc1osc,
          amount: osc1Amount
        },
        osc2: {
          osc: osc2osc,
          amount: osc2Amount
        }
      },
      gains: {
        amount,
        amp,
        filter,
        output
      }
    }) => {
      osc1osc.type = "sine";
      osc1osc.frequency.setValueAtTime(220, context.currentTime);
      osc1osc.start();
      osc1osc.connect(osc1Amount);
      osc2osc.type = "sine";
      osc2osc.frequency.setValueAtTime(110, context.currentTime);
      osc2osc.start();
      osc2osc.connect(osc2Amount);
      osc1Amount.connect(amp);
      osc2Amount.connect(amp);
      amp.connect(filter);
      filter.connect(amount);
      amount.connect(output);
      output.connect(volumeNode);
    });
    volumeNode.gain.value = 0;
    volumeNode.connect(preLfoNode);
    
    //FX - LFO
    preLfoNode.connect(lfo1DryNode);
    lfo1WetNode.gain.value = 0;
    lfo1Node.frequency.value = 4;
    lfo1Node.connect(lfo1WetNode);
    lfo1DryNode.connect(panNode);
    lfo1WetNode.connect(panNode);
    
    preLfoNode.connect(lfo1DryNode);
    lfo2WetNode.gain.value = 0;
    lfo2Node.frequency.value = 4;
    lfo2Node.connect(lfo2WetNode);
    lfo2DryNode.connect(panNode);
    lfo2WetNode.connect(panNode);

    //FX - pan
    panNode.panningModel = "equalpower";
    panNode.setPosition(...panPercentageToValue(50));
    panNode.connect(output);

    createLookAheadSubscription();
  };

  let createLookAheadSubscription = () => {
    //TODO: tidy the way current time is accessed and adsr is changed
    const LOOK_AHEAD_MS = 50;
    const LOOK_AHEAD_RESLOUTION = 10;
    let _adsr = {},
        time = context.currentTime;
    loopSubscription = createLookAheadStream(LOOK_AHEAD_MS, LOOK_AHEAD_RESLOUTION)
      .map(i => time + (i * 0.01))
      .subscribe(time => {
        voiceNodes
        .forEach((voiceNode, i) => {
          if(!state.oscillators) return;
          let key = voiceToKeyMap[i];
          let {
            oscillators: {
              osc1: {
                osc: osc1osc,
                amount: osc1AmountNode
              },
              osc2: {
                osc: osc2osc,
                amount: osc2AmountNode
              }
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
                cent: osc1Cent,
                amount: osc1Amount
              },
              osc2: {
                waveType: osc2WaveType,
                octave: osc2Octave,
                semitone: osc2Semitone,
                cent: osc2Cent,
                amount: osc2Amount
              }
            },
            envelopes: {
              amp: {
                attack: ampAttack,
                decay: ampDecay,
                sustain: ampSustain,
                release: ampRelease
              },
              filter: {
                attack: filterAttack,
                decay: filterDecay,
                sustain: filterSustain,
                release: filterRelease
              }
            },
            filter: {
              frequency: filterFrequency,
              resonance: filterResonance,
              type: filterType
            },
            lfos: {
              lfo1: {
                rate: lfo1Rate,
                amount: lfo1Amount,
                waveType: lfo1Type,
                destination: lfo1Destination
              },
              lfo2: {
                rate: lfo2Rate,
                amount: lfo2Amount,
                waveType: lfo2Type,
                destination: lfo2Destination
              }
            },
            volume,
            pan,
            sends: {
              send1,
              send2
            }
          } = state;
          //set wavetype
          if(osc1osc.type != osc1WaveType) {
            osc1osc.type = osc1WaveType;
          }
          if(osc2osc.type != osc2WaveType) {
            osc2osc.type = osc2WaveType;
          };
          //set frequency
          let osc1keyIndex = normaliseValue((keyboardArray.length * (keyOctave + osc1Octave) + noteIndex), 0, 83);
          let osc2keyIndex = normaliseValue((keyboardArray.length * (keyOctave + osc2Octave) + noteIndex), 0, 83);
          let osc1frequency = keyboardFrequencies[osc1keyIndex];
          let osc2frequency = keyboardFrequencies[osc2keyIndex];
          osc1frequency += (osc1Semitone * osc1frequency * keyTranspose.semitone) + (osc1Cent * osc1frequency * keyTranspose.cent);
          osc2frequency += (osc2Semitone * osc2frequency* keyTranspose.semitone) + (osc2Cent * osc2frequency * keyTranspose.cent);
          osc1osc.frequency.setValueAtTime(osc1frequency, time);
          osc2osc.frequency.setValueAtTime(osc2frequency, time);
          
          //set amounts
          osc1AmountNode.gain.setValueAtTime(osc1Amount * 0.01, time);
          osc2AmountNode.gain.setValueAtTime(osc2Amount * 0.01, time);
          volumeNode.gain.setValueAtTime(volume * 0.01, time);
          send1Node.gain.setValueAtTime(send1 * 0.01, time);
          send2Node.gain.setValueAtTime(send2 * 0.01, time);

          filter.Q.setValueAtTime(filterResonance, time);
          //set pan
          panNode.setPosition(...panPercentageToValue(pan));

          //set amp asdr
          ampAsdrs = updateValue(ampAsdrs, i, adsr(key && !key.released, 10, { attack: ampAttack, decay: ampDecay, sustain: ampSustain, release: ampRelease }, ampAsdrs[i]));
          
          //amp.gain.cancelScheduledValues(time-(LOOK_AHEAD_MS/1000));
          amp.gain.linearRampToValueAtTime(ampAsdrs[i].value * 0.01, time);

          //set filter asdr
          filterAsdrs = updateValue(filterAsdrs, i, adsr(key && !key.released, 10, { attack: filterAttack, decay: filterDecay, sustain: filterSustain, release: filterRelease }, filterAsdrs[i]));     
          //filter.frequency.cancelScheduledValues(time-(LOOK_AHEAD_MS/1000));
          filter.frequency.linearRampToValueAtTime(filterPercentageToValue((filterAsdrs[i].value * (filterFrequency / 100))), time);

          //set lfos
          if(lfo1Node.type != lfo1Type) {
            lfo1Node.type = lfo1Type;
          }

          lfo1DryNode.gain.linearRampToValueAtTime((100 - lfo1Amount) * 0.01, time);
          lfo1WetNode.gain.linearRampToValueAtTime(lfo1Amount * 0.01, time);
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
    //flag keys which are no longer pressed
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
        ampAsdrs = updateValue(ampAsdrs, availableVoice, {
          ...ampAsdrs[availableVoice],
          phase: 'attack'
        });
        filterAsdrs = updateValue(filterAsdrs, availableVoice, {
          ...filterAsdrs[availableVoice],
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