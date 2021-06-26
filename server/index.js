const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const path = require('path');
const router = require('./router');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});
