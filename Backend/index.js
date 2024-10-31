const express = require('express')
const app = express()
var cors = require('cors');
var bodyParser = require('body-parser');
const dbConnection = require("./dbConfig");

const routes = require("./routes/index");

const port = 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  dbConnection();  
})