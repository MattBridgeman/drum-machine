import { getValueFromPath } from "../../natives/object";
import { objectToArrayWithKeyValue } from "../../natives/array";
export let cache = {};

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
    let fromNode = getValueFromPath(fromMachine, fromNodePath);
    let toMachine = getMachineFromConnection(to, instrumentNodes);
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

  //disconnect nodes
  let cacheArray = objectToArrayWithKeyValue(cache);
  cacheArray.forEach(item => {
    let { key, value } = item;
    let { from, to } = value;
    if(!idCache[key]) {
      let fromMachine = getMachineFromConnection(from, instrumentNodes);
      let fromNodePath = from.nodePath;
      let fromNode = getValueFromPath(fromMachine, fromNodePath);
      let toMachine = getMachineFromConnection(to, instrumentNodes);
      let toNodePath = to.nodePath;
      let toNode = getValueFromPath(toMachine, toNodePath);
      fromNode.disconnect(toNode);
    }
  });
};

export let getMachineFromConnection = (connectionNode, instrumentNodes) => {
  let { machineId, type } = connectionNode;
  let node = instrumentNodes.filter(node => 
    node.instrument.type === type && node.instrument.machineId === machineId
  )[0];
  return node.machine;
};
