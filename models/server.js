const express = require("express");
const cors = require("cors");

const RoutesPath = require("../shared/commonTypes/routes");
console.log(RoutesPath);
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = RoutesPath.user;

    console.log(this.usersPath);

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parse and read of body
    this.app.use(express.json());

    //Public path
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
