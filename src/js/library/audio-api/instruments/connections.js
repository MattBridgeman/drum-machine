import { getValueFromPath } from "../../natives/object";
import { objectToArrayWithKeyValue } from "../../natives/array";
export let connectionsCache = {};

export let updateConnections = (instrumentNodes, state) => {
  let idCache = {};
  let { connections } = state;
  connections.forEach(connection => {
    let { id, from, to } = connection;
    let item = connectionsCache[id];
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
    if(!fromNode || !toNode) return;
    fromNode.connect(toNode);

    connectionsCache = {
      ...connectionsCache,
      [id]: {
        from,
        to
      }
    };
  });

  //disconnect nodes
  let connectionsCacheArray = objectToArrayWithKeyValue(connectionsCache);
  connectionsCacheArray.forEach(item => {
    let { key, value } = item;
    let { id, from, to } = value;
    if(!idCache[key]) {
      let fromMachine = getMachineFromConnection(from, instrumentNodes);
      let fromNodePath = from.nodePath;
      let fromNode = getValueFromPath(fromMachine, fromNodePath);
      let toMachine = getMachineFromConnection(to, instrumentNodes);
      let toNodePath = to.nodePath;
      let toNode = getValueFromPath(toMachine, toNodePath);
      if(fromNode && toNode) {
        fromNode.disconnect(toNode);
      }
      delete connectionsCache[key];
    }
  });
};

export let getMachineFromConnection = (connectionNode, instrumentNodes = []) => {
  let { machineId, type } = connectionNode;
  let node = instrumentNodes.filter(node => 
    node.instrument.type === type && node.instrument.machineId === machineId
  )[0];
  return node && node.machine;
};
