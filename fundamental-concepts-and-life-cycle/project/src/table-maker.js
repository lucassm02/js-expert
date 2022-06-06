import chalk from 'chalk';
import chalkTable from 'chalk-table';

export default class TableMaker {
  #data = null;
  #options = null;

  #table = null;

  #columns = null;

  constructor(options = {}) {
    this.#options = { leftPad: 2, ...options };
    if (!options?.columns) throw new Error('COLUMNS_NOT_PROVIDED');
    this.#columns = this.#parseColumns(options.columns);
  }

  #parseColumns(columns) {
    return columns.map((object) => {
      const chalkColor = chalk[object?.color] ?? chalk.white;
      return { field: object?.field, name: chalkColor(object?.name) };
    });
  }

  make(data) {
    this.#data = data;
    this.#table = chalkTable(
      { ...this.#options, columns: this.#columns },
      data
    );
    return this.#table;
  }

  update(data) {
    return this.make(data);
  }

  get() {
    return this.#table;
  }
}
