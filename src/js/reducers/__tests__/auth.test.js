import { expect } from "chai";
import auth from "../auth.reducer";
import {
  AUTH_STATE_CHANGE
} from "../../constants/auth.constants";

describe("Auth reducer", () => {
	it("switches to the new user state", () => {
    let initialState = {
      user: undefined
    };
    let nextState = auth(initialState, {
      type: AUTH_STATE_CHANGE,
      value: {
        firstName: "Foo",
        lastName: "Bar"
      }
    });
    expect(nextState.user.firstName).to.equal("Foo");
    expect(nextState.user.lastName).to.equal("Bar");
  });
});