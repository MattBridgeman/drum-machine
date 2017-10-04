import { expect } from "chai";
import { newNotification, clearNotification } from "../notifications.actions";
import { NEW_NOTIFICATION, CLEAR_NOTIFICATION } from "../../constants/notifications.constants";

describe("Notification actions", function() {

	it("newNotification returns corresponding action", function() {
		var action = newNotification("Some notification");

		expect(action.value).to.equal("Some notification");
	});

	it("clearNotification returns corresponding action", function() {
		var action = clearNotification(1);

		expect(action.value).to.equal(1);
	});
});