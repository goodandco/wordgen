"use strict";

const CommonAlgorithm = require("./common");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function genque() {
  readline.question("Введите буквы для генерации слов?\n", async (input) => {
    const startTime = Date.now();
    console.log(`Время начала выполнения: ${new Date(startTime)}`);
    const searchResults = await CommonAlgorithm.search(input.trim());
    const finishTime = Date.now();
    console.log(`Время конца выполнения: ${new Date(finishTime)}`);
    console.log(`Общее время выполнения: ${(finishTime - startTime) / 1000} s`);
    console.log(searchResults);
    quitque();
  });
}

function quitque() {
  // eslint-disable-next-line consistent-return
  readline.question("Чтобы сыграть ещё раз, нажмите Enter?\n", async (input) => {
    if (["yes", "y", "да", ""].includes(input.trim())) {
      return genque();
    }
    readline.close();
  });
}

genque();

// main();
