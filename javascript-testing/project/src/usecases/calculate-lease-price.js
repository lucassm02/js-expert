class CalculateLeasePrice {
  #tax = null;

  constructor({ tax }) {
    this.#tax = tax;
  }

  calculate(customerAge, categoryPrice, numberOfDays) {
    const { then: tax } = this.#tax.taxesBasedOnAge.find(
      (tax) => customerAge >= tax.from && customerAge <= tax.to
    );

    const price = tax * categoryPrice * numberOfDays;

    const formattedPrice = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(price);

    return formattedPrice;
  }
}

module.exports = CalculateLeasePrice;
