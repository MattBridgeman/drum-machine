import { getValueFromPath } from "../../natives/object";
export let cache = {};

// instrumentNode = instrument: {
// type: "drumMachine"
// machineId: 0  
//}, machine: {
//  outputs: {
//    channels
//  }
//}

export let updateConnections = (instrumentNodes, state) => {
  let idCache = {};
  let { connections } = state;
  connections.forEach(connection => {
    let { id, from, to } = connection;
    let item = cache[id];
    idCache[id] = true;
    if(item) {
      return;
    };
    let fromMachine = getMachineFromConnection(from, state);
    let fromNodePath = from.nodePath;
    let fromNode = getValueFromPath(fromMachine, fromNodePath);
    let toMachine = getMachineFromConnection(to, state);
    let toNodePath = to.nodePath;
    let toNode = getValueFromPath(toMachine, toNodePath);
    fromNode.connect(toNode);

    cache = {
      ...cache,
      [id]: {
        from,
        to
      }
    };
  });
};

export let getMachineFromConnection = (connectionNode, state) => {
  let { machineId, type } = connectionNode; 
  let machine = state[type][machineId];
  return machine;
};
