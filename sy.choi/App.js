const express = require('express');
const app = express();
const path = require('path');

const { connectDB } = require('./src/database/db');
const noteRouter = require('./src/routes/noteRouter');
const bodyParser = require('body-parser');
require('dotenv').config();

// database 연결
connectDB();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', noteRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port http://localhost:${PORT}`);
});
