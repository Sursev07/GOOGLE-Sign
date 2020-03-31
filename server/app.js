const dotenv = require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.port || 3000;
const routes = require('./routes');
const errorHandlers = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

app.listen(port, console.log(`listen on ${port}`))

module.exports = app;
