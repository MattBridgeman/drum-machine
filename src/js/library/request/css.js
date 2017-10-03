import loadCSS from "fg-loadcss";

let cache = {};

export function css(url) {
  let cssPromise = cache[url];
  if(!cssPromise) {
    cssPromise = cache[url] = new Promise(function(resolve, reject) {
      let stylesheet = loadCSS(url);
      if(stylesheet.addEventListener) {
        stylesheet.addEventListener("load", resolve);
        stylesheet.addEventListener("error", reject);
      }

      // This code is for browsers that don’t support onload
      // No support for onload (it'll bind but never fire):
      //	* Android 4.3 (Samsung Galaxy S4, Browserstack)
      //	* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
      //	* Android 2.3 (Pantech Burst P9070)

      // Weak inference targets Android < 4.4
      if("isApplicationInstalled" in navigator && "onloadcssdefined" in stylesheet) {
        stylesheet.onloadcssdefined(resolve);
      }
    });
  }
  return cssPromise;
}