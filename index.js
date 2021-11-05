"use strict";

/* eslint-disable no-console */

const { search } = require("./common");
// eslint-disable-next-line import/order
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function genque() {
  readline.question("Введите буквы для генерации слов?\n", async (input) => {
    console.time("execution time");
    const result = await search(input.trim());
    console.timeEnd("execution time");
    for (const countKey of Object.keys(result)) {
      const groupKey = `Кол. символов:  ${countKey}:`;
      console.group("\x1b[33m%s\x1b[0m", groupKey);
      const mes = result[countKey].reduce((res, w, i) => {
        const newLine = i === 0 || i % 12 ? "" : "\n";
        const postfix = (i + 1 < result[countKey].length) ? `, ${newLine}` : "";
        return res + w + postfix;
      }, "");
      console.log("\x1b[36m%s\x1b[0m", mes);

      console.groupEnd(groupKey);
    }

    // eslint-disable-next-line no-use-before-define
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
