import TestUtils from "react-dom/test-utils";
import React from "react";
import { buffer } from "../buffer";
import { expect } from "chai";
import { NEW_AUDIO_CONTEXT } from "../../constants/audio.context.constants";
import { TOGGLE_PLAY_PAUSE } from "../../constants/play.state.constants";
import { NEW_BUFFER_SEGMENT, CLEAR_BUFFER_SEGMENTS } from "../../constants/buffer.constants";
import { last } from "../../library/natives/array";
import { getStubContext } from "../../library/test-helpers/stubs/audio.api";
import { GlobalSetTimeout, GlobalSetTimeoutTick } from "../../library/test-helpers/stubs/set.timeout";
import configureTestStore from "../../store/test.store";
import td from "testdouble";

const { renderIntoDocument, Simulate } = TestUtils;

describe("Buffer", () => {

});