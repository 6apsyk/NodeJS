// запустить приложение : node *.js 11-11-11-11-2021(минуты-часы-день-месяц-год) 12-12-12-12-2022(минуты-часы-день-месяц-год) и т.д.

const EventEmitter = require("events");
const emitter = new EventEmitter();

const argvArray = process.argv.slice(2).map((item) => tranformTime(item));

/**
 * Функция преобразования строки в новый массив
 * @param {string} дата в формате mm-hh-dd-MM-yyyy (минуты-часы-день-месяц-год)
 * @returns дата в формате массива
 */
function tranformTime(date) {
  const t = date.split("-").reverse();
  const newTime = [];
  for (let value of t) {
    newTime.push(+value);
  }
  newTime[1] = newTime[1] - 1; // чтобы месяцы правильно считывать
  return newTime;
}

const arr1 = [];

argvArray.forEach((item, i) => {
  arr1.push({
    id: i,
    date: item,
    t1() {
      start1(this.date, this.id);
    },
  });
});

function start1(date, id) {
  const t = setInterval(() => {
    const second = (new Date(...date) - Date.parse(new Date())) / 1000;

    if (second == 0) {
      emitter.emit("finish", `Время таймера ${id + 1} вышло`);
      clearInterval(t);
    } else {
      console.log(`TIMER ${id + 1}:`, second);
    }
  }, 1000);
}

arr1.forEach((item) => item.t1());

emitter.on("finish", console.log);
