"use strict";

describe("githubContributor api service", function () {
  var githubContributor;

  beforeEach(module("ptabe2e"));

  beforeEach(inject(function (_githubContributor_) {
    githubContributor = _githubContributor_;
  }));

  it("should do something", function () {
    githubContributor.getContributors();

  });

});