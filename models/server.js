const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const RoutesPath = require('../shared/types/routes');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Database Connection
    this.dbConnection();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parse and read of body
    this.app.use(express.json());

    //Public path
    this.app.use(express.static('public'));

    //File upload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(RoutesPath.user, require('../routes/user.routes'));
    this.app.use(RoutesPath.auth, require('../routes/auth.routes'));
    this.app.use(RoutesPath.categories, require('../routes/category.routes'));
    this.app.use(RoutesPath.products, require('../routes/product.routes'));
    this.app.use(RoutesPath.search, require('../routes/search.routes'));
    this.app.use(RoutesPath.uploads, require('../routes/upload.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
