export const viewportSize = () => {
  let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return {
    width: x,
    height: y
  }
};

export const isTabletLandscape = () => {
  return viewportSize().width >= 1024;
};