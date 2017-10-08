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
    let fromMachine = getMachineFromConnection(from, instrumentNodes);
    let fromNodePath = from.nodePath;
    let fromNode = getValueFromPath(fromMachine, instrumentNodes, fromNodePath);
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

export let getMachineFromConnection = (connectionNode, instrumentNodes) => {
  let { machineId, type } = connectionNode;
  let node = instrumentNodes.filter(node => 
    node.instrument.type === type && node.instrument.machineId === machineId
  )[0];
  return node.machine;
};
