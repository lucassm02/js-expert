'use strict';
import DataHandler from './data-handler.js';
import TableMaker from './table-maker.js';
import Terminal from './terminal.js';

const tableOptions = {
  columns: [
    { field: 'id', name: 'ID', color: 'cyan' },
    { field: 'vehicles', name: 'Veículos', color: 'magenta' },
    { field: 'kmTraveled', name: 'KM', color: 'cyan' },
    { field: 'from', name: 'De', color: 'cyan' },
    { field: 'to', name: 'Até', color: 'cyan' },
  ],
};

const terminal = new Terminal();
const tableMaker = new TableMaker(tableOptions);
const dataHandler = new DataHandler();

const initialData = dataHandler.get();
tableMaker.make(initialData);
const table = tableMaker.get();
terminal.print(table);
