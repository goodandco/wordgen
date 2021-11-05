"use strict";

const fs = require("fs");
const readline = require("readline");

// const FILENAME = "./russian.txt";
const FILENAME = "./word_rus.txt";

class A {
  static async search(input, minLength = 3) {
    return (await A.find({ input, minLength })).reduce((res, word) => {
      const key = word.length;

      if (!res[key]) {
        res[key] = [];
      }

      res[key].push(word);

      return res;
    }, {});
  }

  static async find({ input, minLength }) {
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      const result = [];
      const readStream = fs.createReadStream(FILENAME);
      const rl = readline.createInterface({ input: readStream });

      rl.on("line", (line) => {
        const word = line.trim();
        if (A.match(input, word, minLength)) {
          result.push(word);
        }
      });
      rl.on("close", () => {
        resolve(result);
      });

      rl.on("error", (err) => {
        reject(err);
      });
    });
  }

  static match(input, word, minLength) {
    if (word.length < minLength) {
      return false;
    }

    if (input === word) {
      return true;
    }

    let forChar = input;
    return Array.from(word).every((char) => {
      if (forChar.includes(char)) {
        forChar = forChar.replace(char, "");

        return true;
      }

      return false;
    });
  }
}

module.exports = A;
