const Entity = require("./entity");

class Category extends Entity {
  constructor({ id, name, carIds, price }) {
    super({ id, name, carIds, price });
    this.id = id;
    this.name = name;
    this.carIds = carIds;
    this.price = price;
  }
}

module.exports = Category;
