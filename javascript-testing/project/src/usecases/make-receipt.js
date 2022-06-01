const Transaction = require("../entities/transaction");

class makeReceipt {
  #getRandomCarByCategoryId = null;
  #calculateLeasePrice = null;

  constructor({ getRandomCarByCategoryId, calculateLeasePrice }) {
    this.#getRandomCarByCategoryId = getRandomCarByCategoryId;
    this.#calculateLeasePrice = calculateLeasePrice;
  }

  async make(customer, category, numberOfDays) {
    const car = await this.#getRandomCarByCategoryId.get(category.id);
    const price = this.#calculateLeasePrice.calculate(
      customer.age,
      category.price,
      numberOfDays
    );

    const today = new Date();

    const dueDate = new Date();

    dueDate.setDate(today.getDate() + numberOfDays);

    const dueDateToString = dueDate.toLocaleDateString("pt-br", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return new Transaction({
      amount: price,
      dueDate: dueDateToString,
      car,
      customer,
    });
  }
}

module.exports = makeReceipt;
