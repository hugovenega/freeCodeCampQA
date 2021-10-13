const express = require('express');
const { expect } = require('chai');
const createCorsMiddleware = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const fccTestingRoutes = require('./routes/fcctesting');
const runner = require('./test-runner');

const app = express();
const urlencodedOpts = { extended: true };
const corsMiddlewareOpts = { origin: '*' };
app.use('/public', express.static(`${process.cwd()}/public`));

app.use(createCorsMiddleware(corsMiddlewareOpts));

app.use(express.urlencoded(urlencodedOpts));
app.use(express.json());

app.route('/').get((req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

fccTestingRoutes(app);

apiRoutes(app);

app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(() => {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; // for testing
