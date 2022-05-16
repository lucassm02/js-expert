const Entity = require("./entity");

class Customer extends Entity {
  constructor({ id, name, age }) {
    super({ id, name, age });
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

module.exports = Customer;
