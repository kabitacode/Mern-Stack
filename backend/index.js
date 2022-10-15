const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require('body-parser')
require("./src/database/index.js")
const routes = require('./src/routes/index.js');

const app = express()
const port = 4000

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/book", routes)

app.listen(port, () => {
    console.log("Server berhasil!" + port);
})
