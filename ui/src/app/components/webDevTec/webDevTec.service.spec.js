"use strict";

describe("webDevTec api service", function () {
  var webDevTec;

  beforeEach(module("ptabe2e"));

  beforeEach(inject(function (_webDevTec_) {
    webDevTec = _webDevTec_;
  }));

  it("should do something", function () {
    webDevTec.getTec();
  });

});