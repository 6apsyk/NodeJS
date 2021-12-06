const fs = require("fs/promises");
const { lstatSync } = require("fs");
const inquirer = require("inquirer");
const yargs = require("yargs");
const path = require("path");

let currentDirectory = process.cwd();

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const start = async () => {
  const list = await fs.readdir(currentDirectory);
  const items = list.map(fileName => new ListItem(path.join(currentDirectory, fileName), fileName));

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: `Choose:`,
        choices: items.map(item => ({ name: item.fileName, value: item })),
      },
    ])
    .then(answer => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await start();
  } else {
    const data = await fs.readFile(item.path, "utf-8");
    console.log(data);
  }
};

start();
