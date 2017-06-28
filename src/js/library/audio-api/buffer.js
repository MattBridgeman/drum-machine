class Buffer {

  constructor(props){
    this.isPlaying = false;
  }

  render(){
    let { playState } = this.props;
    if(playState.isPlaying && !this.isPlaying){
      this.start();
    } else if(!playState.isPlaying && this.isPlaying) {
      this.stop();
    }
    return null;
  }

  componentDidMount(){
  }

  start(){
    if(this.isPlaying) return;
    this.isPlaying = true;
    this.buffer();
  }

  stop(){
    let { dispatch } = this.props;
    //clear all buffered
    //do clearing of frames that have passed
    //do queuing
		const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    window.setTimeout(bufferActions.clearBufferSegments, 0);
    this.isPlaying = false;
  }

  buffer(){
    if(!this.isPlaying) return;
    let { dispatch, playState, tempo, buffer, context } = this.props;
		const bufferActions = bindActionCreators(DrumMachineActions.buffer, dispatch);
    let currentLookAhead = context.currentTime + LOOK_AHEAD_IN_SECONDS;
    let segmentTime = getSegmentTimeInSeconds(tempo.beatsPerMinute, tempo.segmentsPerBeat);
    let segmentsToBuffer = getSegmentsInTimespan(LOOK_AHEAD_IN_SECONDS, segmentTime);
    let segmentsToBufferAsArray = numberToArrayLength(segmentsToBuffer);
    let lastBuffer = last(buffer);
    //do clearing of frames that have passed
    buffer.filter(({time, id}) => 
      time + MAX_KEEP_STALE_BUFFER_IN_SECONDS <= context.currentTime
    ).forEach(({id}) => window.setTimeout(() => bufferActions.clearBufferSegment(id), 0));
    //do queuing
    if(!lastBuffer || lastBuffer.time < currentLookAhead) {
      segmentsToBufferAsArray
        .map(segmentIndex => ({
          segmentIndex: lastBuffer ? normalisedIndex(playState, tempo, lastBuffer.index + (segmentIndex + 1)) : segmentIndex,
          time: lastBuffer ? lastBuffer.time + ((1 + segmentIndex) * segmentTime) : context.currentTime + (segmentIndex * segmentTime) + BUFFER_DELAY_IN_SECONDS
        }))
        .forEach(({
          segmentIndex,
          time
        }) => {
          window.setTimeout(() => bufferActions.newBufferSegment(segmentIndex, time), 0);
        });
    }

    this.nextFrame = window.setTimeout(() => this.buffer(), LOOP_INTERVAL_IN_MILLISECONDS);
  }
}

export { Buffer };