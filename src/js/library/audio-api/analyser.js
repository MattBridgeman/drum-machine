export let createAnalyser = () => {
  let canvas = document.createElement("canvas");
  canvas.setAttribute("height", "500px");
  document.body.appendChild(canvas);
  let items = [];
  let canvasCtx = canvas.getContext("2d");
  let draw = () => {
    requestAnimationFrame(draw);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";
    canvasCtx.fillRect(0, 0, canvas.width / items, canvas.height);

    items.forEach(({ analyser, name }, index) => {
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      let itemWidth = canvas.width * 1.0 / items.length;
      let sliceWidth = itemWidth / bufferLength;
      let x = itemWidth * index;
    
      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.font = "6px Helvetica";
      canvasCtx.fillText(name, x, 15);

      canvasCtx.beginPath();
      
      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = v * canvas.height / 2;
    
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
    
        x += sliceWidth;
      }
    
      canvasCtx.lineTo(x + sliceWidth / items.length, canvas.height / 2);
      canvasCtx.stroke();
    });
  }
  draw();
  return {
    addItem: (analyser, name) => {
      items.push({ analyser, name });
    }
  }
};