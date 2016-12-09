import * as React from "react";
import { rangeToArray, first, last } from "../../library/natives/array";
import { easeIn, easeInOut } from "../../library/animation/easing";
import { normaliseValue, normalisedStretchValue, isBeyondNormalisedValue } from "../../library/natives/numbers";

const STEP_SIZE = 33.3;
const STEP_OFFSET = -1;

class Slider extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
      lastTranslate: [0, 0],
      touchData: [],
      coordinateData: {
        numberOfItems: 0,
        containerWidth: 300,
        itemWidth: 100,
        itemsVisible: 3
      },
      touching: false,
      touchMomentum: 0
    };
	}
	
	render() {
    let { min, max, step, value, onChange } = this.props;
    let steps = rangeToArray(min, max, step);
    let minStep = 1;
    let maxStep = steps.length;
    let currentStep = value - min / step;
    let viewStep = currentStep + STEP_OFFSET;
    let x = viewStep * STEP_SIZE * -1;
    var sliderStyle = {
			transform: "translate(" + x + "%, 0)"
		};
		return (
			<div className="slider" ref="slider">
        <div className="slider-wrapper" style={sliderStyle}>
          { steps.map((tempo, i) => 
            <div className="item">{tempo}</div>
          )}
        </div>
      </div>
		);
	}

  _render() {
    window.requestAnimationFrame(() => {
      var translateData = this.getTranslateData();
      var x = translateData[0];
      var y = translateData[1];
      $wrapper.style.transform = 'translate(' + x + 'px, 0px)';
      _render();
    });
  }

  getNow() {
    return new Date().getTime();
  }

  initTouchData() {
    this.setState({
      lastTranslate: this.getTranslateData(),
      touchData: [[0,0,0]]
    });
  }

  updateTouchData({clientX, clientY}) {
    this.setState({
      touchData: this.state.touchData.concat([clientX, clientY, this.getNow()])
    });
  }

  getInitialTranslateData() {
    var x = this.getMaxX();
    return [x, 0, this.getNow()];
  }

  getTranslateData() {
    if(this.state.touchData.length){
      var position = this.getPosition();
      var scrollForceOffset = this.getScrollForceOffset(position);
      var stretchedBoundary = this.applyStretchedBoundary(scrollForceOffset);
      var boundedPosition;
      if(this.stretchedBeyondBounds(stretchedBoundary)) {
        boundedPosition = this.getScrollBounceback(stretchedBoundary);
      } else {
        //boundedPosition = applyBoundary(stretchedBoundary);
        boundedPosition = this.snapToValue(stretchedBoundary);
      }
      return boundedPosition;
    } else {
      return this.state.lastTranslate;
    }
  }

  getTouchMomentum() {
    var diffMilliseconds = 250;
    var now = this.getNow();
    var recentTouches = this.state.touchData
      .filter(touch =>
        now - touch[2] <= diffMilliseconds
      )
      .reduce((acc, curr, i, array) => {
        var prev = array[i-1];
        var speed = prev ? (curr[0] - prev[0]) / (curr[2] - prev[2]) : 0;
        var sum = acc + speed;
        if(i == array.length - 1)
          return sum / array.length;
        else
          return sum;
      }, 0);
    return recentTouches;
  }

  getPosition() {
    var first = first(this.state.touchData);
    var last = last(this.state.touchData);
    var x = this.state.lastTranslate[0]-(first[0]-last[0]);
    var y = this.state.lastTranslate[1]-(first[1]-last[1]);
    return [x,y];
  }

  getScrollForceOffset([x,y]) {
    if(this.state.touching || !this.state.touchMomentum) return [x,y];
    var elapsedTime = this.getElapsedTimeSinceLastTouch();
    var distanceToTravel = this.getScrollDistanceToTravel();
    var duration = this.getScrollDuration();
    if(!this.isScrollForceBeingApplied()) {
      x += distanceToTravel;
      return [x,y];
    }
    x += easeOut(elapsedTime, 0, distanceToTravel, duration);
    return [x,y];
  }

  getScrollBounceback([x, y]) {
    if(this.state.touching || this.isScrollForceBeingApplied()) return [x,y];
    var timeSinceLastTouch = this.getElapsedTimeSinceLastTouch();
    var elapsedTime = timeSinceLastTouch - this.getScrollDuration();
    var xBound = normaliseValue(x, this.getMinX(), this.getMaxX());
    var distanceToTravel = x - xBound;
    var duration = 300;
    if(elapsedTime >= duration) {
      x = xBound;
    } else {
      x -= easeInOut(elapsedTime, 0, distanceToTravel, duration);
    }
    return [x,y];
  }

  snapToValue([x, y]) {
    if(this.state.touching || this.isScrollForceBeingApplied()) return [x,y];
    var timeSinceLastTouch = this.getElapsedTimeSinceLastTouch();
    var elapsedTime = timeSinceLastTouch - this.getScrollDuration();
    var nearest = this.nearestValue(x);
    var distanceToTravel = x - nearest;
    var duration = 200;
    if(elapsedTime >= duration) {
      x = nearest;
    } else {
      x -= easeInOut(elapsedTime, 0, distanceToTravel, duration);
    }
    return [x,y];
  }

  getElapsedTimeSinceLastTouch() {
    var last = last(this.state.touchData);
    var now = this.getNow();
    var elapsedTime = now - last[2];
    return elapsedTime;
  }

  getScrollDistanceToTravel() {
    return touchMomentum * 80;
  }

  getScrollDuration() {
    var duration = this.getScrollDistanceToTravel() * 2;
    return Math.sqrt(duration * duration);
  }

  isScrollForceBeingApplied() {
    if(this.state.touching || !this.state.touchMomentum) return false;
    var elapsedTime = this.getElapsedTimeSinceLastTouch();
    var duration = this.getScrollDuration();
    return elapsedTime <= duration;
  }

  applyBoundary([x,y]) {
    var xMin = this.getMinX();
    var xMax = this.getMaxX();
    var x = normaliseValue(x, xMin, xMax);
    return [x, y];
  }

  applyStretchedBoundary([x,y]) {
    var xMin = this.getMinX();
    var xMax = this.getMaxX();
    var x = normalisedStretchValue(x, xMin, xMax);
    return [x, y];
  }

  stretchedBeyondBounds([x,y]) {
    var xMin = this.getMinX();
    var xMax = this.getMaxX();
    return this.isBeyondNormalisedValue(x, xMin, xMax);
  }

  nearestValue(x) {
    return $items
      .map(($item, i) => this.state.coordinateData.itemWidth * i)
      .reduce((prev, curr) => {
        var prevDiff = prev - x;
        var currDiff = curr - x;
        if(prevDiff < currDiff) {
          return prev;
        }
        return curr;
      });
  }

  getMinX(){
    return -this.state.coordinateData.itemWidth * (this.state.coordinateData.numberOfItems - 2);
  }

  getMaxX(){
    return this.state.coordinateData.itemWidth; 
  }

  componentDidMount() {
		let { slider: $slider } = this.refs;

    $slider.addEventListener('touchstart', e => {
      e.preventDefault();
      var touches = e.touches[0];
      this.initTouchData();
      this.setState({
        touching: true
      });
      this.updateTouchData(touches);
    });

    $slider.addEventListener('touchmove', e => {
      e.preventDefault();
      var touches = e.touches[0];
      this.updateTouchData(touches);
    });

    $slider.addEventListener('touchend', e => {
      e.preventDefault();
      this.setState({
        touching: true
      });
      var lastTouch = last(this.state.touchData);
      this.updateTouchData({
        clientX: lastTouch[0],
        clientY: lastTouch[1]
      });
      this.setState({
        touchMomentum: this.getTouchMomentum()
      });
    });
  }
}

Slider.propTypes = {
};

export { Slider };