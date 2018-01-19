import { expect } from "chai";
import td from "testdouble";
import { exactMatchPath } from "../routing";
import { matchPath } from "react-router";

describe("Routing", () => {
  it("matches for exact param number matches", () => {
    let match = exactMatchPath("/users/WmXoGltJLeYoDMHJJEcSY6jo3Bz1/tracks/-L0LZQ8ZnJk1NlSoQudz", "/users/:userId/tracks/:trackId")
    expect(!!match).to.equal(true);
    td.reset();
  });
  it("doesn't match for when number of params are different", () => {
    let match = exactMatchPath("/users/WmXoGltJLeYoDMHJJEcSY6jo3Bz1/tracks/", "/users/:userId/tracks/:trackId")
    expect(!!match).to.equal(false);
    td.reset();
  });
  it("doesn't match for when number of params are different", () => {
    let match = exactMatchPath("/users/WmXoGltJLeYoDMHJJEcSY6jo3Bz1/tracks/-L0LZQ8ZnJk1NlSoQudz", "/users/:userId/tracks/")
    expect(!!match).to.equal(false);
    td.reset();
  });
  it("doesn't match for when number of params are different", () => {
    let match = matchPath("/users/WmXoGltJLeYoDMHJJEcSY6jo3Bz1/tracks/", "/users/:userId/tracks/:trackId")
    expect(!!match).to.equal(false);
    td.reset();
  });
  it("doesn't match for when number of params are different", () => {
    let match = matchPath("/users/WmXoGltJLeYoDMHJJEcSY6jo3Bz1/tracks/-L0LZQ8ZnJk1NlSoQudz", "/users/:userId/tracks/")
    expect(!!match).to.equal(true);
    td.reset();
  });
});