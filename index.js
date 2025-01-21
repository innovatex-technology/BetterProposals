const express = require('express');
const dotenv =  require('dotenv');
const cors = require('cors');
const path = require('path')

//components
const Connection = require('./database/dbconfig.js');
const Router = require('./routes/route.js');

//env properties
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', Router);

if(process.env.ENV === "production")
{
  const dirPath = path.resolve();
  app.use(express.static('front_end/build'));
  app.get("*",(req, res) => {
    res.sendFile(path.resolve(dirPath,"front_end","build","index.html"))
  })
}

const PORT = process.env.PORT || 3001;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});