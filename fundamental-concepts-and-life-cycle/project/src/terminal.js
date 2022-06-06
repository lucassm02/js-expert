import readline from 'readline';
import DraftLog from 'draftlog';

export default class Terminal {
  #terminal = null;
  #draftLog = null;

  constructor() {
    this.#draftLog = DraftLog(console).addLineListener(process.stdin);
    this.#terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  async question(message) {
    if (typeof message !== 'string') throw new Error('INVALID_MESSAGE TYPE');
    return new Promise((resolve) => {
      this.#terminal.question(message, (message) => {
        return resolve(message);
      });
    });
  }

  close() {
    this.#terminal.close();
  }

  clear() {
    const CLEAR = '\u001b[2J\u001b[0;0H';
    process.stdout.write(CLEAR);
  }

  print(data, context = null) {
    if (context) context(data);
    return console.draft(data);
  }
}
