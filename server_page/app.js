const http = require("http");
const fs = require("fs");

const requestHandler = (req, res) => {
  console.log(req.url);

  let fileName = "";

  switch (req.url) {
    case "/":
      fileName = "./index.html";
      break;
    case "/about":
      fileName = "./about.html";
      break;
    case "/contact":
      fileName = "./contact.html";
      break;
    default:
      fileName = "./404.html";
      break;
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.end("<h1>Internal Server Error</h1>");
      return;
    }
    res.end(data); 
  });
};
const server = http.createServer(requestHandler);

server.listen(3000);
