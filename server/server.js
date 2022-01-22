const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {checkToken} = require('./middlewares/auth')
require('dotenv').config()



// routers
const users = require('./routes/api/users')
const articles = require('./routes/api/articles')





let mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:?retryWrites=true&w=majority`
// mongoUri = "mongodb://127.0.0.1:27017/flickbase"



// mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:27017,${process.env.DB_HOST}:27017,cluster0-shard-00-02-lo1zs.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log("Connected to database successfully")
}).catch(e=>{
    console.log(e)
})

app.use(express.json());
app.use(checkToken);
app.use("/api/users",users);
app.use("/api/articles",articles);

//if not api route then what to do, run the client react app
app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})


