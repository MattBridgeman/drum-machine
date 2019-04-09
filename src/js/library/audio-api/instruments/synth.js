import { map } from "rxjs/operators";
import { getAudioContext } from "../context";
import { timeout } from "../interval";
import { panPercentageToValue } from "../pan";
import { numberToArrayLength, numberToArrayLengthWithValue, updateValue, last } from "../../natives/array";
import ogen from "../../generator/ogen";
import { createBufferStream } from "../buffer.stream";
import { createLookAheadStream } from "../lookahead.stream";
import { setAttackDecayValues, setSustainReleaseValues } from "../adsr";
import { keyboardMap, keyboardArray, keyboardFrequencies, keyTranspose } from "../../keyboard";
import { normaliseValue, percentageToValueOfRange } from "../../natives/numbers";
import { filterPercentageToValue } from "../filter";
import { createAnalyser } from "../analyser";
import { Subject } from "rxjs";
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
  let lfo1OutNode = null;
  let lfo2Node = null;
  let lfo2WetNode = null;
  let lfo2OutNode = null;
  let lfo2DryNode = null;
  let loopSubscription = false;
  let voices = MAX_VOICES;
  let availableVoice = 0;
  let state = {};
  let updateStream = new Subject();
  let bufferStream;
  //let drawer = createAnalyser();
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
          filterAnalyser: context.createAnalyser(),
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
    lfo1OutNode = context.createGain();
    lfo2Node = context.createOscillator();
    lfo2DryNode = context.createGain();
    lfo2WetNode = context.createGain();
    lfo2OutNode = context.createGain();

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
        filterAnalyser,
        output
      }
    }, i) => {
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
      amp.gain.value = 0;
      filter.connect(amount);
      // filterAnalyser.connect(amount);
      // filterAnalyser.fftSize = 2048;
      //TODO: remove debug analyser
      //drawer.addItem(filterAnalyser, `VoiceNode ${i}`);
      amount.connect(output);
      output.connect(volumeNode);
    });
    volumeNode.gain.value = 1;
    volumeNode.connect(preLfoNode);
    
    //FX - LFO
    preLfoNode.connect(lfo1DryNode);
    lfo1WetNode.gain.value = 0;
    lfo1Node.frequency.value = 0;
    lfo1Node.connect(lfo1WetNode);
    lfo1DryNode.connect(panNode);
    lfo1WetNode.connect(lfo1OutNode);
    lfo1WetNode.connect(panNode);
    
    preLfoNode.connect(lfo2DryNode);
    lfo2WetNode.gain.value = 0;
    lfo2Node.frequency.value = 0;
    lfo2Node.connect(lfo2WetNode);
    lfo2DryNode.connect(panNode);
    lfo2WetNode.connect(lfo2OutNode);
    lfo2WetNode.connect(panNode);

    //FX - pan
    panNode.panningModel = "equalpower";
    panNode.setPosition(...panPercentageToValue(50));
    panNode.connect(output);

    createNoteStream();
  };

  let createNoteStream = () => {
    bufferStream = createBufferStream(updateStream)
      .subscribe(buffer => {
        let { time = 0, index = 0, bar = 0, duration } = buffer;
        let { currentBankIndex, banks, oscillators } = state;
        let noteIndex = banks[currentBankIndex][index];
        let keyOctave = 0;
        if(noteIndex === -1 || !oscillators) return;
        //increment the voice to use
        ++availableVoice;
        if(availableVoice >= voices) {
          availableVoice = 0;
        }
        let voiceNode = voiceNodes[availableVoice];
        let {
          oscillators: {
            osc1: {
              osc: osc1osc
            },
            osc2: {
              osc: osc2osc
            }
          },
          gains: {
            amp,
            filter
          }
        } = voiceNode;
        let {
          oscillators: {
            osc1: {
              octave: osc1Octave,
              semitone: osc1Semitone,
              cent: osc1Cent
            },
            osc2: {
              octave: osc2Octave,
              semitone: osc2Semitone,
              cent: osc2Cent
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
              release: filterRelease,
              amount: filterAmount
            }
          },
          filter: {
            frequency: filterFrequency,
            resonance: filterResonance,
            type: filterType
          }
        } = state;
        //set frequency
        let osc1keyIndex = normaliseValue((keyboardArray.length * (keyOctave + osc1Octave) + noteIndex), 0, 83);
        let osc2keyIndex = normaliseValue((keyboardArray.length * (keyOctave + osc2Octave) + noteIndex), 0, 83);
        let osc1frequency = keyboardFrequencies[osc1keyIndex];
        let osc2frequency = keyboardFrequencies[osc2keyIndex];
        osc1frequency += (osc1Semitone * osc1frequency * keyTranspose.semitone) + (osc1Cent * osc1frequency * keyTranspose.cent);
        osc2frequency += (osc2Semitone * osc2frequency* keyTranspose.semitone) + (osc2Cent * osc2frequency * keyTranspose.cent);
        osc1osc.frequency.setValueAtTime(osc1frequency, time);
        osc2osc.frequency.setValueAtTime(osc2frequency, time);
        
        //amp.gain.cancelScheduledValues(time);
        let adsrValues = { attack: ampAttack, decay: ampDecay, sustain: ampSustain, release: ampRelease };
        let keyPressDuration = duration * 0.5;
        setAttackDecayValues(adsrValues, time, amp.gain);
        setSustainReleaseValues(adsrValues, time + keyPressDuration, amp.gain);

        //set filter asdr
        let filterAdsrValues = { attack: filterAttack, decay: filterDecay, sustain: filterSustain, release: filterRelease };
        setAttackDecayValues(filterAdsrValues, time, filter.frequency, value => {
          const percentage = filterFrequency + ((value - filterFrequency) * (filterAmount * 0.01));
          return filterPercentageToValue(percentage);
        });
        setSustainReleaseValues(filterAdsrValues, time + keyPressDuration, filter.frequency, value => {
          const percentage = filterFrequency + ((value - filterFrequency) * (filterAmount * 0.01));
          return filterPercentageToValue(percentage);
        });
      });
  };

  let update = (instrument, state) => {
    let { machineId } = instrument;
    let { synth } = state;
    updateConnections(instrument, state);
    updateState(instrument, state);
    updateParams(instrument, state);
    updateStream.next(state.buffer);
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

  let updateParams = () => {
    let time = context.currentTime;
    voiceNodes
      .forEach((voiceNode) => {
        if(!state.oscillators) return;
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
            filter
          }
        } = voiceNode;
        let {
          oscillators: {
            osc1: {
              waveType: osc1WaveType,
              amount: osc1Amount
            },
            osc2: {
              waveType: osc2WaveType,
              amount: osc2Amount
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
              waveType: lfo1Type
            },
            lfo2: {
              rate: lfo2Rate,
              amount: lfo2Amount,
              waveType: lfo2Type
            }
          },
          voices: numberOfVoices,
          volume,
          pan,
          sends: {
            send1,
            send2
          }
        } = state;
        voices = numberOfVoices;
        //set wavetype
        if(osc1osc.type != osc1WaveType) {
          osc1osc.type = osc1WaveType;
        }
        if(osc2osc.type != osc2WaveType) {
          osc2osc.type = osc2WaveType;
        };
        
        //set amounts
        osc1AmountNode.gain.setValueAtTime(osc1Amount * 0.01, time);
        osc2AmountNode.gain.setValueAtTime(osc2Amount * 0.01, time);
        volumeNode.gain.setValueAtTime(volume * 0.01, time);
        send1Node.gain.setValueAtTime(send1 * 0.01, time);
        send2Node.gain.setValueAtTime(send2 * 0.01, time);

        if(filter.type != filterType) {
          filter.type = filterType;
        }
        //console.log(filterPercentageToValue(filterFrequency));
        filter.frequency.setValueAtTime(filterPercentageToValue(filterFrequency), time);
        filter.Q.setValueAtTime(filterResonance * 0.05, time);
        //set pan
        panNode.setPosition(...panPercentageToValue(pan));

        //set lfos
        if(lfo1Node.type != lfo1Type) {
          lfo1Node.type = lfo1Type;
        }
        lfo1Node.frequency.value = lfo1Rate;
        lfo1DryNode.gain.linearRampToValueAtTime((100 - lfo1Amount) * 0.01, time);
        lfo2OutNode.gain.linearRampToValueAtTime(lfo1Amount * 0.01, time);

        if(lfo2Node.type != lfo2Type) {
          lfo2Node.type = lfo2Type;
        }
        lfo2Node.frequency.value = lfo2Rate;
        lfo2DryNode.gain.linearRampToValueAtTime((100 - lfo2Amount) * 0.01, time);
        lfo2OutNode.gain.linearRampToValueAtTime(lfo2Amount * 0.01, time);
      });
  };
  
  let remove = () => {
    context = null;
    loopSubscription.unsubscribe();
    bufferStream.unsubscribe();
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