import { expect } from "chai";
import { asdr } from "../asdr";

describe("ASDR", () => {
  describe("attack", () => {
    it("returns value of 100 and phase of 'decay' given low attack", () => {
      let keyPressed = true;
      let elapsed = 10;
      let asdrValues = {
        attack: 0
      };
      let previous = {};
      let { phase, value, time } = asdr(keyPressed, elapsed, asdrValues, previous);
      expect(value).to.equal(100);
      expect(phase).to.equal("decay");
    });

    it("returns a value of 1 and phase of 'attack' given high attack", () => {
      let keyPressed = true;
      let elapsed = 10;
      let asdrValues = {
        attack: 100
      };
      let previous = {};
      let { phase, value, time } = asdr(keyPressed, elapsed, asdrValues, previous);
      expect(value).to.equal(1);
      expect(phase).to.equal("attack");
    });
    
    it("returns a value of 50 and phase of 'attack' given mid attack", () => {
      let keyPressed = true;
      let elapsed = 10;
      let asdrValues = {
        attack: 50
      };
      let previous = {};
      let { phase, value, time } = asdr(keyPressed, elapsed, asdrValues, previous);
      expect(value).to.equal(51);
      expect(phase).to.equal("attack");
    });
  });

  describe("decay", () => {
    it("returns sustain value and phase of 'sustain' given high decay", () => {
      let keyPressed = true;
      let elapsed = 10;
      let asdrValues = {
        attack: 0,
        decay: 100,
        sustain: 50
      };
      let previous = {
        phase: "decay",
        value: 100,
        time: 10
      };
      let { phase, value, time } = asdr(keyPressed, elapsed, asdrValues, previous);
      expect(value).to.equal(50);
      expect(phase).to.equal("sustain");
    });

    it("returns value of 50 and phase of 'decay' given mid decay and low sustain", () => {
      let keyPressed = true;
      let elapsed = 10;
      let asdrValues = {
        attack: 0,
        decay: 50,
        sustain: 0
      };
      let previous = {
        phase: "decay",
        value: 100,
        time: 10
      };
      let { phase, value, time } = asdr(keyPressed, elapsed, asdrValues, previous);
      expect(value).to.equal(50);
      expect(phase).to.equal("decay");
    });
    
    it("returns value of 99 and phase of 'decay' given low decay and low sustain", () => {
      let keyPressed = true;
      let elapsed = 10;
      let asdrValues = {
        attack: 0,
        decay: 1,
        sustain: 0
      };
      let previous = {
        phase: "decay",
        value: 100,
        time: 10
      };
      let { phase, value, time } = asdr(keyPressed, elapsed, asdrValues, previous);
      expect(value).to.equal(99);
      expect(phase).to.equal("decay");
    });
  });
});