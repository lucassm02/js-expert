const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const categoryMocks = require("../mocks/category");
const customerMocks = require("../mocks/customer");
const carMocks = require("../mocks/car");
const sinon = require("sinon");
const MakeReceipt = require("../../src/usecases/make-receipt");
const CalculateLeasePrice = require("../../src/usecases/calculate-lease-price");
const GetRandomCarByCategoryId = require("../../src/usecases/get-random-car-by-category-id");
const Tax = require("../../src/entities/tax");
const Transaction = require("../../src/entities/transaction");
const Repository = require("../../src/repositories/repository");

describe("MakeReceipt suite tests", () => {
  const category = { ...categoryMocks.validCategories[0], price: 37.6 };
  const [carId] = category.carIds;
  const car = carMocks.validCars.find(({ id }) => id === carId);

  let categoryRepository = {};
  let carRepository = {};
  let getRandomCarByCategoryId = {};
  let carRepositoryStub = {};
  let categoryRepositoryStub = {};
  let sandbox = {};

  let makeReceipt = {};
  let calculateLeasePrice = {};

  before(() => {
    calculateLeasePrice = new CalculateLeasePrice({ tax: Tax });

    carRepository = new Repository({ filename: "cars.json" });
    categoryRepository = new Repository({ filename: "categories.json" });

    carRepositoryStub = sinon.stub(carRepository, carRepository.findById.name);

    categoryRepositoryStub = sinon.stub(
      categoryRepository,
      categoryRepository.findById.name
    );

    categoryRepositoryStub.withArgs(category.id).resolves(category);
    carRepositoryStub.withArgs(category.carIds[0]).resolves(car);

    const getRandomItemFromArrayStub = sinon.stub();

    getRandomItemFromArrayStub.withArgs(category.carIds).returns(carId);

    getRandomCarByCategoryId = new GetRandomCarByCategoryId({
      carRepository,
      categoryRepository,
      getRandomItemFromArray: getRandomItemFromArrayStub,
    });

    makeReceipt = new MakeReceipt({
      calculateLeasePrice,
      getRandomCarByCategoryId,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Given a customer and a car category it should return a transaction receipt", async () => {
    const customer = { ...customerMocks.validCustomer, age: 20 };

    const numberOfDays = 5;
    const dueDate = "6 de junho de 2022";

    const now = new Date(2022, 5, 1);

    sandbox.useFakeTimers(now.getTime());

    const expectedAmount = calculateLeasePrice.calculate(
      customer.age,
      category.price,
      numberOfDays
    );

    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount: expectedAmount,
    });
    const result = await makeReceipt.make(customer, category, numberOfDays);

    expect(result).to.be.deep.equal(expected);
  });
});
