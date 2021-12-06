const readline = require("readline");
const fs = require("fs");

let file = fs.createReadStream("./access.log");
let out1 = fs.createWriteStream(`./%89.123.1.41%_requests.log`);
let out2 = fs.createWriteStream("./%34.48.240.111%_requests.log");

let rl = readline.createInterface({
  input: file,
  output: [out1, out2],
});
rl.on("line", line => {
  if (line.includes("89.123.1.41")) {
    out1.write(`${line}\n`);
  }
  if (line.includes("34.48.240.111")) {
    out2.write(`${line}\n`);
  }
  if (line == "") {
    rl.close();
  }
});
