const http = require("http");
const path = require("path");
const fs = require("fs");

(async () => {
  const isFile = path => fs.lstatSync(path).isFile();

  http
    .createServer((req, res) => {
      const fullPath = path.join(process.cwd(), req.url);

      if (!fs.existsSync(fullPath)) return res.end("404, NOT Found");

      if (isFile(fullPath)) {
        return fs.createReadStream(fullPath).pipe(res);
      }
      let linksList = "";

      const urlParams = req.url.match(/[\d\w\.]+/gi);

      if (urlParams) {
        urlParams.pop();
        const prevUrl = urlParams.join("/");
        linksList = urlParams.length
          ? `<div><a style="color:green;" href="/${prevUrl}"><---назад</a></div>`
          : `<div><a style="color:green;" href="/"><---назад</a></div>`;
      }

      fs.readdirSync(fullPath).forEach(fileName => {
        const filePath = path.join(req.url, fileName);
        linksList += `<div><a style="color:red;" href="${filePath}">${fileName}</a></div>`;
      });
      const HTML = fs
        .readFileSync(path.join(__dirname, "index.html"), "utf-8")
        .replace("Главная страница!!!!", linksList);
      res.writeHead(200, "OK", {
        "Content-Type": "text/html",
      });
      return res.end(HTML);
    })
    .listen(5555);
})();
