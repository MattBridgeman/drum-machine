import { expect } from "chai";
import notifications from "../notifications.reducer";
import {
    NEW_NOTIFICATION,
    CLEAR_NOTIFICATION
} from "../../constants/notifications.constants";

describe("Notification reducer", () => {
	it("adds a new notification", () => {
    let initialState = [];
    let nextState = notifications(initialState, {
      type: NEW_NOTIFICATION,
      value: "Test Notification"
    });
    expect(nextState[0].value).to.equal("Test Notification");
    expect(nextState[0].id).to.be.a("number");
  });
	it("removes a new notification", () => {
    let initialState = [{
      id: 1,
      value: "some notification"
    }];
    let nextState = notifications(initialState, {
      type: CLEAR_NOTIFICATION,
      value: 1
    });
    expect(nextState).to.be.an("array").that.is.empty;
  });
});