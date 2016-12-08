import * as React from "react";
import { rangeToArray, first, last } from "../../library/natives/array";
import { easeIn, easeInOut } from "../../library/animation/easing";
import { normaliseValue, normalisedStretchValue } from "../../library/natives/numbers";

const STEP_SIZE = 33.3;
const STEP_OFFSET = -1;

class Slider extends React.Component {

	constructor(props) {
		super(props);
    this.state = {
      lastTranslate: null,
      touchData: [],
      coordinateData: {},
      touching: false,
      touchMomentum: 0
    };
    // initCoordinateData();
    // lastTranslate = getInitialTranslateData();
    // render();
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

  getNow() {
    return new Date().getTime();
  }

  initTouchData() {
    lastTranslate = getTranslateData();
    touchData = [];
  }

  updateTouchData({clientX, clientY}) {
    touchData.push([clientX, clientY, getNow()]);
  }

  initCoordinateData() {
    var numberOfItems = $items.length;
    var containerWidth = $scroller.getBoundingClientRect().width;
    var itemWidth = $items[0].getBoundingClientRect().width;
    var itemsVisible = containerWidth / itemWidth;
    coordinateData = {
      numberOfItems,
      containerWidth,
      itemWidth,
      itemsVisible
    };
  }

  getInitialTranslateData() {
    var x = getMaxX();
    return [x, 0, getNow()];
  }

  getTranslateData() {
    if(touchData.length){
      var position = getPosition();
      var scrollForceOffset = getScrollForceOffset(position);
      var stretchedBoundary = applyStretchedBoundary(scrollForceOffset);
      var boundedPosition;
      if(stretchedBeyondBounds(stretchedBoundary)) {
        boundedPosition = getScrollBounceback(stretchedBoundary);
      } else {
        //boundedPosition = applyBoundary(stretchedBoundary);
        boundedPosition = snapToValue(stretchedBoundary);
      }
      return boundedPosition;
    } else {
      return lastTranslate;
    }
  }

  getTouchMomentum() {
    var diffMilliseconds = 250;
    var now = getNow();
    var recentTouches = touchData
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
    var first = _.first(touchData);
    var last = _.last(touchData);
    var x = lastTranslate[0]-(first[0]-last[0]);
    var y = lastTranslate[1]-(first[1]-last[1]);
    return [x,y];
  }

  getScrollForceOffset ([x,y]) {
    if(touching || !touchMomentum) return [x,y];
    var elapsedTime = getElapsedTimeSinceLastTouch();
    var distanceToTravel = getScrollDistanceToTravel();
    var duration = getScrollDuration();
    if(!isScrollForceBeingApplied()) {
      x += distanceToTravel;
      return [x,y];
    }
    x += easeOut(elapsedTime, 0, distanceToTravel, duration);
    return [x,y];
  }

  getScrollBounceback ([x, y]) {
    if(touching || isScrollForceBeingApplied()) return [x,y];
    var timeSinceLastTouch = getElapsedTimeSinceLastTouch();
    var elapsedTime = timeSinceLastTouch - getScrollDuration();
    var xBound = normaliseValue(x, getMinX(), getMaxX());
    var distanceToTravel = x - xBound;
    var duration = 300;
    if(elapsedTime >= duration) {
      x = xBound;
    } else {
      x -= easeInOut(elapsedTime, 0, distanceToTravel, duration);
    }
    return [x,y];
  }

  snapToValue ([x, y]) {
    if(touching || isScrollForceBeingApplied()) return [x,y];
    var timeSinceLastTouch = getElapsedTimeSinceLastTouch();
    var elapsedTime = timeSinceLastTouch - getScrollDuration();
    var nearest = nearestValue(x);
    var distanceToTravel = x - nearest;
    var duration = 200;
    if(elapsedTime >= duration) {
      x = nearest;
    } else {
      x -= easeInOut(elapsedTime, 0, distanceToTravel, duration);
    }
    return [x,y];
  }

  getElapsedTimeSinceLastTouch () {
    var last = _.last(touchData);
    var now = getNow();
    var elapsedTime = now - last[2];
    return elapsedTime;
  }

  getScrollDistanceToTravel() {
    return touchMomentum * 80;
  }

  getScrollDuration () {
    var duration = getScrollDistanceToTravel() * 2;
    return Math.sqrt(duration * duration);
  }

  isScrollForceBeingApplied () {
    if(touching || !touchMomentum) return false;
    var elapsedTime = getElapsedTimeSinceLastTouch();
    var duration = getScrollDuration();
    return elapsedTime <= duration;
  }

  applyBoundary ([x,y]) {
    var xMin = getMinX();
    var xMax = getMaxX();
    var x = normaliseValue(x, xMin, xMax);
    return [x, y];
  }

  applyStretchedBoundary ([x,y]) {
    var xMin = getMinX();
    var xMax = getMaxX();
    var x = normalisedStretchValue(x, xMin, xMax);
    return [x, y];
  }

  isBeyondBound (value, min, max) {
    if(value < min) return true;
    if(value > max) return true;
    return false;
  };

  stretchedBeyondBounds ([x,y]) {
    var xMin = getMinX();
    var xMax = getMaxX();
    return isBeyondBound(x, xMin, xMax);
  }

  nearestValue (x) {
    return $items
      .map(($item, i) => coordinateData.itemWidth * i)
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
    return -coordinateData.itemWidth * (coordinateData.numberOfItems - 2);
  }

  getMaxX(){
    return coordinateData.itemWidth; 
  }

  _render() {
    window.requestAnimationFrame(() => {
      var translateData = getTranslateData();
      var x = translateData[0];
      var y = translateData[1];
      $wrapper.style.transform = 'translate(' + x + 'px, 0px)';
      _render();
    });
  }

  componentDidMount(){
		let { slider: $slider } = this.refs;

    $slider.addEventListener('touchstart', e => {
      e.preventDefault();
      var touches = e.touches[0];
      initTouchData();
      touching = true;
      updateTouchData(touches);
    });

    $slider.addEventListener('touchmove', e => {
      e.preventDefault();
      var touches = e.touches[0];
      updateTouchData(touches);
    });

    $slider.addEventListener('touchend', e => {
      e.preventDefault();
      touching = false;
      var lastTouch = _.last(touchData);
      updateTouchData({
        clientX: lastTouch[0],
        clientY: lastTouch[1]
      });
      touchMomentum = getTouchMomentum();
    });
  }
}

Slider.propTypes = {
};

export { Slider };