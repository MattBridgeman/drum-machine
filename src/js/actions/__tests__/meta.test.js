import { expect } from "chai";
import { changeTrackTitle, changeTrackCreatedDate, changeTrackUpdatedDate } from "../meta.actions";
import { CHANGE_TRACK_TITLE, CHANGE_TRACK_CREATED_DATE, CHANGE_TRACK_UPDATED_DATE } from "../../constants/meta.constants";

describe("Meta actions", function() {

	it("changeTrackTitle returns corresponding action", function() {
		var action = changeTrackTitle("Untitled Track");

    expect(action).to.deep.equal({
      type: CHANGE_TRACK_TITLE,
      title: "Untitled Track"
    });
  });

	it("changeTrackCreatedDate returns corresponding action", function() {
		var action = changeTrackCreatedDate(1234);
    
    expect(action).to.deep.equal({
      type: CHANGE_TRACK_CREATED_DATE,
      createdDate: 1234
    });
  });
  
  it("changeTrackUpdatedDate returns corresponding action", function() {
    var action = changeTrackUpdatedDate(1234);
    
    expect(action).to.deep.equal({
      type: CHANGE_TRACK_UPDATED_DATE,
      updatedDate: 1234
    });
  });
});