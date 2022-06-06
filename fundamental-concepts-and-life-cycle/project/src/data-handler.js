import database from '../database.json' assert { type: 'json' };
import Vehicle from './vehicle.js';
import { formateSnakeCaseKeysForCamelCase } from '@badass-team-code/formatted-cases-words';

export default class DataHandler {
  #data = [];
  #subscribers = [];

  constructor() {
    this.#data = formateSnakeCaseKeysForCamelCase(database);
  }
  get(language = 'pt-BR') {
    return this.#data.map((item) => new Vehicle(item).formatted(language));
  }
  add(data) {
    const { id: lastId } = this.#data.at(-1);
    const newId = lastId + 1;
    this.#data = [...this.#data, { ...data, id: newId }];
    this.#subscribers.map((subscriber) => {
      subscriber(this.get());
    });
  }

  onChange(subscriber) {
    this.#subscribers = [...this.#subscribers, subscriber];
  }
}
