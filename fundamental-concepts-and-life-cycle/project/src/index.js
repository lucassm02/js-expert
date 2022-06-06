'use strict';
import DataHandler from './data-handler.js';
import TableMaker from './table-maker.js';
import Terminal from './terminal.js';
import questions from '../form.json' assert { type: 'json' };

const STOP_COMMAND = ':q';

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

dataHandler.onChange((data) => {
  tableMaker.update(data);
});

async function questionLoop(responses = {}, index = 0) {
  const current = questions[index];

  if (!current) return responses;

  terminal.clear();
  const table = tableMaker.get();
  terminal.print(table);

  terminal.print('\nDigite :q para sair;');
  const response = await terminal.question(current.question);

  if (response === STOP_COMMAND) return;

  return await questionLoop(
    { ...responses, [current.field]: response },
    ++index
  );
}

async function mainLoop() {
  try {
    const responses = await questionLoop();

    if (!responses) {
      terminal.close();
      console.log('Finalizando...');
      return;
    }

    const vehicles = responses.vehicles.split(',');

    dataHandler.add({ ...responses, vehicles });

    return mainLoop();
  } catch (error) {
    console.log(error);
  }
}

await mainLoop();
