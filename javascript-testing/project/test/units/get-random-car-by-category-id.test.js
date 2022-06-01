const { describe, it, before, beforeEach, afterEach } = require("mocha");
const Repository = require("../../src/repositories/repository");
const GetRandomCarByCategoryId = require("../../src/usecases/get-random-car-by-category-id");
const { getRandomItemFromArray } = require("../../src/utils");
const { expect } = require("chai");
const carMocks = require("../mocks/car");
const categoryMocks = require("../mocks/category");
const sinon = require("sinon");

describe("GetRandomCarByCategoryId suite tests", () => {
  const [category] = categoryMocks.validCategories;
  const [carId] = category.carIds;
  const car = carMocks.validCars.find(({ id }) => id === carId);

  let categoryRepository = {};
  let carRepository = {};
  let getRandomCarByCategoryId = {};
  let carRepositoryStub = {};
  let categoryRepositoryStub = {};
  let sandbox = {};

  before(() => {
    carRepository = new Repository({ filename: "cars.json" });
    categoryRepository = new Repository({ filename: "categories.json" });

    carRepositoryStub = sinon.stub(carRepository, carRepository.findById.name);

    categoryRepositoryStub = sinon.stub(
      categoryRepository,
      categoryRepository.findById.name
    );

    categoryRepositoryStub.withArgs(category.id).resolves(category);
    carRepositoryStub.withArgs(category.carIds[0]).resolves(car);

    getRandomCarByCategoryId = new GetRandomCarByCategoryId({
      carRepository,
      categoryRepository,
      getRandomItemFromArray,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Ensure that the categoryRepository is called with the category id", async () => {
    await getRandomCarByCategoryId.get(category.id);

    const calledWithResult = categoryRepositoryStub.calledWith(category.id);

    expect(calledWithResult).to.be.ok;
  });

  it("Ensure that the carRepository is called with the car id", async () => {
    const getRandomItemFromArrayStub = sandbox.stub();

    getRandomItemFromArrayStub.withArgs(category.carIds).returns(carId);

    const getRandomCarByCategoryId = new GetRandomCarByCategoryId({
      carRepository,
      categoryRepository,
      getRandomItemFromArray: getRandomItemFromArrayStub,
    });

    await getRandomCarByCategoryId.get(category.id);

    const calledWithResult = carRepositoryStub.calledWith(carId);

    expect(calledWithResult).to.be.ok;
  });

  it("Given a category it should return an available car", async () => {
    const getRandomItemFromArrayStub = sandbox.stub();

    getRandomItemFromArrayStub.withArgs(category.carIds).returns(carId);

    const getRandomCarByCategoryId = new GetRandomCarByCategoryId({
      carRepository,
      categoryRepository,
      getRandomItemFromArray: getRandomItemFromArrayStub,
    });

    const result = await getRandomCarByCategoryId.get(category.id);

    expect(result).to.be.equals(car);
  });
});
