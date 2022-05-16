const { describe, it } = require("mocha");
const {
  getRandomIndexFromArray,
  getRandomItemFromArray,
} = require("../../src/utils");
const { expect } = require("chai");

describe("Utils suite tests", () => {
  it("Should retrieve a random index from an array", async () => {
    const data = [0, 1, 2, 3, 4];
    const result = getRandomIndexFromArray(data);
    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("Should retrieve a random item from an array", async () => {
    const data = [0, 1];
    const result = getRandomItemFromArray(data);
    expect(data).to.deep.include(result);
  });
});
