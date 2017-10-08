import React from "react";
import { expect } from "chai";
import td from "testdouble";
import { updateConnections, cache } from "../connections";

describe("Connections", () => {
  it("connects the two nodes represented in the connection data", () => {
    let state = {
      drumMachine: {
        0: [{
          mute: false,
          solo: false,
          pan: 50,
          volume: 100
        }]
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }, {
        id: 1,
        type: "master",
        machineId: 0
      }],
      connections: [{
        id: 0,
        from: {
          machineId: 0,
          type: "drumMachine",
          nodePath: "outputs/main"
        },
        to: {
          machineId: 0,
          type: "master",
          nodePath: "inputs/main"
        }
      }]
    };
    let drumMachineOutput = {
      connect: td.function()
    };
    let masterInput = {
      connect: td.function()
    };
    let instrumentNodes = [{
      instrument: {
        type: "drumMachine",
        machineId: 0  
      },
      machine: {
        outputs: {
          main: drumMachineOutput
        }
      }
    },{
      instrument: {
        type: "master",
        machineId: 0  
      },
      machine: {
        inputs: {
          main: masterInput
        }
      }
    }];
    updateConnections(instrumentNodes, state);
    td.verify(drumMachineOutput.connect(masterInput));
  });

  it("diconnects two nodes missing in the connection data", () => {
    let state = {
      drumMachine: {
        0: [{
          mute: false,
          solo: false,
          pan: 50,
          volume: 100
        }]
      },
      instruments: [{
        id: 0,
        type: "drumMachine",
        machineId: 0
      }, {
        id: 1,
        type: "master",
        machineId: 0
      }],
      connections: []
    };
    let drumMachineOutput = {
      connect: td.function(),
      disconnect: td.function()
    };
    let masterInput = {
      connect: td.function(),
      disconnect: td.function()
    };
    let instrumentNodes = [{
      instrument: {
        type: "drumMachine",
        machineId: 0  
      },
      machine: {
        outputs: {
          main: drumMachineOutput
        }
      }
    },{
      instrument: {
        type: "master",
        machineId: 0  
      },
      machine: {
        inputs: {
          main: masterInput
        }
      }
    }];
    updateConnections(instrumentNodes, state);
    td.verify(drumMachineOutput.disconnect(masterInput));
  });
});