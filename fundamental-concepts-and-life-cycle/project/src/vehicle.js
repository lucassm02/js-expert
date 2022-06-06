export default class Vehicle {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id;
    this.vehicles = vehicles.map((item) => item.trim());
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const stringToDate = (date) => {
      const chunks = date.split('-').map(Number);
      if (chunks.length !== 3) throw new Error('INVALID_DATE');
      const [year, month, day] = chunks;
      const parsedMonth = month - 1;
      return new Date(year, parsedMonth, day);
    };

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: 'long',
        type: 'conjunction',
      }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language, {
        style: 'unit',
        unit: 'kilometer',
      }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(stringToDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(stringToDate(this.to)),
    };
  }
}
