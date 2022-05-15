const Base = require("./base");

class CarCategory extends Base {
  constructor({ id, name, carIds, price }) {
    super({ id, name, carIds, price });
    this.id = id;
    this.name = name;
    this.carIds = carIds;
    this.price = price;
  }
}

module.exports = CarCategory;
