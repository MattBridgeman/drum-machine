import React, { Component } from "react";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import DrumMachineActions from "../../actions/root.actions";
import { Rotator } from "../rotator/rotator.react.jsx";
import { Slider } from "../slider/slider.react.jsx";
import { Fader } from "../fader/fader.react.jsx";
import { PatternBeat } from "../pattern/pattern.beat.react.jsx";
import { objectToArray, numberToArrayLength } from "../../library/natives/array";
import { keyboardArray } from "../../library/keyboard";
import { Selector, SelectorOption } from "../selector/selector.react";
import { Collapsible, CollapsibleHeader, CollapsibleContent } from "../collapsible/collapsible.react";
import { GridContainer, GridAxis, GridAxisItem, Grid, GridRow, GridItem } from "../grid/grid.react";

let Synth = props => {
  const { synth, machineId, dispatch, playState } = props;
  const synthParams = synth[machineId];
  const synthActions = bindActionCreators(DrumMachineActions.synth, dispatch);
  return <div className="synth-machine">
    <div className="basic-controls">
      <Collapsible initialState="closed">
        <CollapsibleHeader>Basic Controls</CollapsibleHeader>
        <CollapsibleContent>
          <div className="basic-controls-inner">
            <Slider name="Voices" min={1} max={8} step={1} value={synthParams.voices} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "voices", null, value)
            } />
            <Rotator name="Volume" value={synthParams.volume} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "volume", null, value)
            } />
            <Rotator name="Pan" value={synthParams.pan} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "pan", null, value)
            } />
            <Rotator name="Send 1" value={synthParams.sends.send1} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "sends", "send1", value)
            } />
            <Rotator name="Send 2" value={synthParams.sends.send2} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "sends", "send2", value)
            } />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div className="filter">
      <Collapsible initialState="closed">
        <CollapsibleHeader>Filter</CollapsibleHeader>
        <CollapsibleContent>
          <div className="filter-controls">
            <div className="select-item">
              <h3 className="item-label">Type</h3>
              <Selector id="filter-type" onValueChange={ value =>
                synthActions.changeSynthParam(machineId, "filter", "type", value)
              }>
                <SelectorOption value="highpass" selected={synthParams.filter.type === "highpass"}>High Pass</SelectorOption>
                <SelectorOption value="lowpass" selected={synthParams.filter.type === "lowpass"}>Low Pass</SelectorOption>
                <SelectorOption value="bandpass" selected={synthParams.filter.type === "bandpass"}>Band Pass</SelectorOption>
              </Selector>
            </div>
            <div className="parameter-group">
              <div className="parameter">
                <label htmlFor="filter-frequency" className="item-label">Frequency</label>
                <Fader id="filter-frequency" type="range" min={0} max={100} value={synthParams.filter.frequency} onValueChange={ value => 
                  synthActions.changeSynthParam(machineId, "filter", "frequency", value)
                } step="1" />
              </div>
              <div className="parameter">
                <label htmlFor="filter-resonance" className="item-label">Resonance</label>
                <Fader id="filter-resonance" type="range" min={0} max={100} value={synthParams.filter.resonance} onValueChange={ value => 
                  synthActions.changeSynthParam(machineId, "filter", "resonance", value)
                } step="1" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div className="oscillator-container">
      <div className="oscillator">
        <Collapsible initialState="open">
          <CollapsibleHeader>Oscillator 1</CollapsibleHeader>
          <CollapsibleContent>
            <div className="oscillator-controls">
              <div className="select-item">
                <h3 className="item-label">Type</h3>
                <Selector id="osc1-type" onValueChange={ value =>
                  synthActions.changeSynthParam(machineId, "osc1", "waveType", value)
                }>
                  <SelectorOption value="sine" selected={synthParams.oscillators.osc1.waveType === "sine"}>Sine</SelectorOption>
                  <SelectorOption value="square" selected={synthParams.oscillators.osc1.waveType === "square"}>Square</SelectorOption>
                  <SelectorOption value="sawtooth" selected={synthParams.oscillators.osc1.waveType === "sawtooth"}>Sawtooth</SelectorOption>
                  <SelectorOption value="triangle" selected={synthParams.oscillators.osc1.waveType === "triangle"}>Triangle</SelectorOption>
                </Selector>
              </div>
              <Slider name="Octave" min={0} max={7} step={1} value={synthParams.oscillators.osc1.octave} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc1", "octave", value)
              } />
              <Slider name="Semitone" min={0} max={11} step={1} value={synthParams.oscillators.osc1.semitone} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc1", "semitone", value)
              } />
              <Slider name="Cent" min={0} max={100} step={1} value={synthParams.oscillators.osc1.cent} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc1", "cent", value)
              } />
              <Rotator name="Amount" value={synthParams.oscillators.osc1.amount} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc1", "amount", value)
              } />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="oscillator">
        <Collapsible initialState="open">
          <CollapsibleHeader>Oscillator 2</CollapsibleHeader>
          <CollapsibleContent>
            <div className="oscillator-controls">
              <div className="select-item">
                <h3 className="item-label">Type</h3>
                <Selector id="osc2-type" onValueChange={ value =>
                  synthActions.changeSynthParam(machineId, "osc2", "waveType", value)
                }>
                  <SelectorOption value="sine" selected={synthParams.oscillators.osc2.waveType === "sine"}>Sine</SelectorOption>
                  <SelectorOption value="square" selected={synthParams.oscillators.osc2.waveType === "square"}>Square</SelectorOption>
                  <SelectorOption value="sawtooth" selected={synthParams.oscillators.osc2.waveType === "sawtooth"}>Sawtooth</SelectorOption>
                  <SelectorOption value="triangle" selected={synthParams.oscillators.osc2.waveType === "triangle"}>Triangle</SelectorOption>
                </Selector>
              </div>
              <Slider name="Octave" min={0} max={7} step={1} value={synthParams.oscillators.osc2.octave} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc2", "octave", value)
              } />
              <Slider name="Semitone" min={0} max={11} step={1} value={synthParams.oscillators.osc2.semitone} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc2", "semitone", value)
              } />
              <Slider name="Cent" min={0} max={100} step={1} value={synthParams.oscillators.osc2.cent} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc2", "cent", value)
              } />
              <Rotator name="Amount" value={synthParams.oscillators.osc2.amount} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "osc2", "amount", value)
              } />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
    <div className="envelope">
      <Collapsible initialState="closed">
        <CollapsibleHeader>Amp Envelope</CollapsibleHeader>
        <CollapsibleContent>
          <div className="envelope-controls">
            <div className="parameter">
              <label htmlFor="amp-attack" className="item-label">Attack</label>
              <Fader id="amp-attack" type="range" min={0} max={100} value={synthParams.envelopes.amp.attack} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "amp", "attack", value)
              } step={1} />
            </div>
            <div className="parameter">
              <label htmlFor="amp-decay" className="item-label">Decay</label>
              <Fader id="amp-decay" type="range" min={0} max={100} value={synthParams.envelopes.amp.decay} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "amp", "decay", value)
              } step={1} />
            </div>
            <div className="parameter">
              <label htmlFor="amp-sustain" className="item-label">Sustain</label>
              <Fader id="amp-sustain" type="range" min={0} max={100} value={synthParams.envelopes.amp.sustain} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "amp", "sustain", value)
              } step={1} />
            </div>
            <div className="parameter">
              <label htmlFor="amp-release" className="item-label">Release</label>
              <Fader id="amp-release" type="range" min={0} max={100} value={synthParams.envelopes.amp.release} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "amp", "release", value)
              } step={1} />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div className="envelope">
      <Collapsible initialState="closed">
        <CollapsibleHeader>Filter Envelope</CollapsibleHeader>
        <CollapsibleContent>
          <div className="envelope-controls">
            <div className="parameter">
              <label htmlFor="filter-attack" className="item-label">Attack</label>
              <Fader id="filter-attack" type="range" min={0} max={100} value={synthParams.envelopes.filter.attack} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "env-filter", "attack", value)
              } step={1} />
            </div>
            <div className="parameter">
              <label htmlFor="filter-decay" className="item-label">Decay</label>
              <Fader id="filter-decay" type="range" min={0} max={100} value={synthParams.envelopes.filter.decay} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "env-filter", "decay", value)
              } step={1} />
            </div>
            <div className="parameter">
              <label htmlFor="filter-sustain" className="item-label">Sustain</label>
              <Fader id="filter-sustain" type="range" min={0} max={100} value={synthParams.envelopes.filter.sustain} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "env-filter", "sustain", value)
              } step={1} />
            </div>
            <div className="parameter">
              <label htmlFor="filter-release" className="item-label">Release</label>
              <Fader id="filter-release" type="range" min={0} max={100} value={synthParams.envelopes.filter.release} onValueChange={ value => 
                synthActions.changeSynthParam(machineId, "env-filter", "release", value)
              } step={1} />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div className="lfo">
      <Collapsible initialState="closed">
        <CollapsibleHeader>LFO 1</CollapsibleHeader>
        <CollapsibleContent>
          <div className="lfo-controls">
            <Rotator name="Rate" value={synthParams.lfos.lfo1.rate} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo1", "rate", value)
            } />
            <Rotator name="Amount" value={synthParams.lfos.lfo1.amount} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo1", "amount", value)
            } />
            <div className="select-item">
              <h3 className="item-label">Type</h3>
              <Selector id="lfo1-type" onValueChange={ value =>
                synthActions.changeSynthParam(machineId, "lfo1", "waveType", value)
              }>
                <SelectorOption value="sine" selected={synthParams.lfos.lfo1.waveType === "sine"}>Sine</SelectorOption>
                <SelectorOption value="square" selected={synthParams.lfos.lfo1.waveType === "square"}>Square</SelectorOption>
                <SelectorOption value="sawtooth" selected={synthParams.lfos.lfo1.waveType === "sawtooth"}>Sawtooth</SelectorOption>
                <SelectorOption value="triangle" selected={synthParams.lfos.lfo1.waveType === "triangle"}>Triangle</SelectorOption>
              </Selector>
            </div>
            <div className="select-item">
              <h3 className="item-label">Destination</h3>
              <Selector id="lfo1-destination" onValueChange={ value =>
                synthActions.changeSynthParam(machineId, "lfo1", "destination", value)
              }>
                <SelectorOption value="sine" selected={synthParams.lfos.lfo1.destination === "amp"}>Amplitude</SelectorOption>
              </Selector>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
    <div className="lfo">
      <Collapsible initialState="closed">
        <CollapsibleHeader>LFO 2</CollapsibleHeader>
        <CollapsibleContent>
          <div className="lfo-controls">
            <Rotator name="Rate" value={synthParams.lfos.lfo2.rate} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo2", "rate", value)
            } />
            <Rotator name="Amount" value={synthParams.lfos.lfo2.amount} onValueChange={ value => 
              synthActions.changeSynthParam(machineId, "lfo2", "amount", value)
            } />
            <div className="select-item">
              <h3 className="item-label">Type</h3>
              <Selector id="lfo2-type" onValueChange={ value =>
                synthActions.changeSynthParam(machineId, "lfo2", "waveType", value)
              }>
                <SelectorOption value="sine" selected={synthParams.lfos.lfo2.waveType === "sine"}>Sine</SelectorOption>
                <SelectorOption value="square" selected={synthParams.lfos.lfo2.waveType === "square"}>Square</SelectorOption>
                <SelectorOption value="sawtooth" selected={synthParams.lfos.lfo2.waveType === "sawtooth"}>Sawtooth</SelectorOption>
                <SelectorOption value="triangle" selected={synthParams.lfos.lfo2.waveType === "triangle"}>Triangle</SelectorOption>
              </Selector>
            </div>
            <div className="select-item">
              <h3 className="item-label">Destination</h3>
              <Selector id="lfo2-destination" onValueChange={ value =>
                synthActions.changeSynthParam(machineId, "lfo2", "destination", value)
              }>
                <SelectorOption value="sine" selected={synthParams.lfos.lfo2.destination === "amp"}>Amplitude</SelectorOption>
              </Selector>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
    <GridContainer types={["show-grid-axis-x", "show-grid-axis-y"]}>
      <GridAxis type="x">
        { objectToArray(synthParams.banks[synthParams.currentBankIndex])
            .map((value, index) =>
              <GridAxisItem>{index + 1}</GridAxisItem>
            )
        }
      </GridAxis>
      <GridAxis type="y">
        { numberToArrayLength(12)
            .map((key, keyIndex) => {
              let keyValue = 11 - keyIndex;
              return <GridAxisItem>{keyboardArray[keyValue]}</GridAxisItem>;
            })
        }
      </GridAxis>
      <Grid>
        { numberToArrayLength(12)
            .map((key, keyIndex) => {
              let keyValue = 11 - keyIndex;
              let keyName = keyboardArray[keyValue];
              return <GridRow type={classnames({ dark: keyName.includes('#'), light: !keyName.includes('#') })}>
                { objectToArray(synthParams.banks[synthParams.currentBankIndex])
                    .map((value, index) =>
                      <GridAxisItem>
                        <PatternBeat key={`pattern-item-${index}-${key}`} index={index} current={playState.currentSegmentIndex === index} selected={value === keyValue} onToggle={() => synthActions.changeSynthParam(machineId, "pattern-item", `${synthParams.currentBankIndex}.${index}`, keyValue)} showIndicator={false} />
                      </GridAxisItem>
                    )
                }
              
              </GridRow>
            })
        }
      </Grid>
    </GridContainer>
  </div>
};

export { Synth };