export const newId = ids => {
  return ids.map(number => parseInt(number))
    .reduce((previousId, nextId) => previousId < nextId ? nextId : previousId, -1) + 1;
};