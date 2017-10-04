let cache = {};

export function script(url) {
  let scriptPromise = cache[url];
  if(!scriptPromise) {
    scriptPromise = cache[url] = new Promise(function (resolve, reject) {
      var r = false,
          t = document.getElementsByTagName("script")[0],
          s = document.createElement("script");

      s.type = "text/javascript";
      s.src = url;
      s.async = true;
      s.onload = s.onreadystatechange = function () {
          if (!r && (!this.readyState || this.readyState == "complete")) {
              r = true;
              resolve(this);
          }
      };
      s.onerror = s.onabort = reject;
      t.parentNode.insertBefore(s, t);
    });
  }
  return scriptPromise;
}