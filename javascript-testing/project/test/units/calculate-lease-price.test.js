const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const categoryMocks = require("../mocks/category");
const customerMocks = require("../mocks/customer");
const sinon = require("sinon");
const CalculateLeasePrice = require("../../src/usecases/calculate-lease-price");
const Tax = require("../../src/entities/tax");

describe("CalculateLeasePrice suite tests", () => {
  let calculateLeasePrice = {};

  before(() => {
    calculateLeasePrice = new CalculateLeasePrice({
      tax: Tax,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Given a category price, customer age and number of days it should calculate final amount in real", async () => {
    const customer = { ...customerMocks.validCustomer, age: 50 };
    const category = { ...categoryMocks.validCategory, price: 37.6 };

    const numberOfDays = 5;
    const expectedValue = 244.4;

    sandbox
      .stub(Tax, "taxesBasedOnAge")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const expected = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(expectedValue);

    const result = calculateLeasePrice.calculate(
      customer.age,
      category.price,
      numberOfDays
    );

    expect(result).to.be.deep.equal(expected);
  });
});
