/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import log from 'fancy-log';

// Routes
import routes from './routes';

// DB Connection
import { setConnection } from './config';

setConnection();

const app = express();

// Port
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Append to all the routes
app.use('/api/v1/', routes);

// Catch all routes not available above
app.use('*', (req, res) => {
  res.status(404).send({
    error: 'page not found',
  });
});

app.listen(PORT, () => {
  log(`app running on port ${PORT}`);
});
