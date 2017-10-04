import { expect } from "chai";
import { authStateChange } from "../auth.actions";
import { AUTH_STATE_CHANGE } from "../../constants/auth.constants";

describe("Auth actions", function() {

	it("authStateChange returns corresponding action", function() {
		var action = authStateChange({
			firstName: "Foo",
			lastName: "Bar"
		});

		expect(action).to.deep.equal({
			type: AUTH_STATE_CHANGE,
			value: {
				firstName: "Foo",
				lastName: "Bar"
			}
		});
	});
});