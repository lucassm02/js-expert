const faker = require("faker");

const Car = require("../src/entities/car");
const Category = require("../src/entities/category");
const Customer = require("../src/entities/customer");
const { join } = require("path");
const { writeFile } = require("fs/promises");
const seederFolder = join(__dirname, "../", "database");

const ITEMS_AMOUNT = 2;

const loop = (callback) => {
  const STOP = Symbol("STOP");
  const handler = (state = []) => {
    const value = callback(state, () => STOP);
    if (value === STOP) return state;
    return handler(value);
  };

  return handler();
};

const write = (filename, data) =>
  writeFile(join(seederFolder, filename), JSON.stringify(data));

const carCategory = new Category({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

const cars = loop((data, stop) => {
  if (data.length === ITEMS_AMOUNT) return stop();

  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  carCategory.carIds = [...carCategory.carIds, car.id];

  return [...data, car];
});

const customers = loop((data, stop) => {
  if (data.length === ITEMS_AMOUNT) return stop();

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    age: faker.datatype.number({ min: 18, max: 50 }),
  });

  return [...data, customer];
});

async function main() {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("categories.json", [carCategory]);
}

main();
