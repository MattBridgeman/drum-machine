export let cache = {};

export let updateConnections = (instrumentNodes, state) => {
  let idCache = {};
  let { connections } = state;
  connections.map(connection => {
    let { id, from, to } = connection;
    let item = cache[id];
    if(item) return item;
    
  });
};