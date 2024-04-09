global.logger || (global.logger = require('../configs/logger'));
require('./containers/container');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const YAML = require('yamljs');
const path = require('path');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = YAML.load(
//   path.join(__dirname, '../galaxyCommanders.yaml'),
// );

// Routes
const authRouter = require('./routes/authRouter');
const csvRouter = require('./routes/csvRouter');
const stageRouter = require('./routes/stageRouter');
const workShopRouter = require('./routes/workShopRouter');
const itemRouter = require('./routes/itemRouter');
const shipRouter = require('./routes/shipRouter');
const passRouter = require('./routes/passRouter');
const storeRouter = require('./routes/storeRouter');
const aDsRouter = require('./routes/aDSRouter');

const whitelist = ['https://dev.d3wbv4kvwl5a.amplifyapp.com/', 'http://localhost:3000'];

const corsOptionsDelegate = function (req, callback) {};

morgan.token('remote-addr', (req) => {
  return JSON.stringify(req.headers['x-forwarded-for']) || req.ip;
});

const getRequestLogging = (req, res, next) => {
  if (process.env.NODE_ENV !== 'PROD') {
    logger.Request(
      `[${req.method}] ${req.url} ${`header : ${JSON.stringify(
        req.headers,
      )}, : body : ${JSON.stringify(req.body)}`}`,
    );
  }
  next();
};

const appConfig = {
  routes: [
    { path: '/csv', router: csvRouter },
    { path: '/auth', router: authRouter },
    { path: '/stage', router: stageRouter },
    { path: '/workshop', router: workShopRouter },
    { path: '/item', router: itemRouter },
    { path: '/ship', router: shipRouter },
    { path: '/space_pass', router: passRouter },
    { path: '/store', router: storeRouter },
    { path: '/ads', router: aDsRouter },
  ],

  middlewares: [
    // 미들웨어를 여기에 작성
    express.static('public'),
    cors(corsOptionsDelegate),
    express.json(),
    express.urlencoded({ extended: false }),
    morgan(`[:remote-addr][:method][:status] :url (:response-time ms)`, {
      stream: logger.stream,
    }),
    getRequestLogging,
  ],
};

class App {
  constructor() {
    this.app = express();
    this.setUp();
  }

  async setUp() {
    //config 설정
    logger.Info('Set up ...');
    require('dotenv').config();

    require('./loaders/Cache');
    const mongoDB = require('./loaders/MongoDB');
    await mongoDB.connectMongoDB();

    const ExpressLoader = require('./loaders/Express');
    new ExpressLoader(this.app, appConfig);

    await this.start();
  }

  async start() {
    return await new Promise((resolve, reject) => {
      this.server = this.app.listen(8000, (err) => {
        if (err) {
          logger.Error(err);
          reject(err);
          return;
        }
        logger.Info(`Express listening on port : ${8000}`);
        resolve();
      });
    });
  }
}
module.exports = App;
new App();
