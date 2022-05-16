class GetRandomCarByCategoryId {
  #carRepository = null;
  #categoryRepository = null;
  #getRandomItemFromArray = null;

  constructor({ carRepository, categoryRepository, getRandomItemFromArray }) {
    this.#carRepository = carRepository;
    this.#categoryRepository = categoryRepository;
    this.#getRandomItemFromArray = getRandomItemFromArray;
  }

  async get(categoryId) {
    const category = await this.#categoryRepository.findById(categoryId);
    const randomCarId = this.#getRandomItemFromArray(category.carIds);
    const car = await this.#carRepository.findById(randomCarId);
    return car;
  }
}

module.exports = GetRandomCarByCategoryId;
