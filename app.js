require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser =require('cookie-parser');
const app = express();


app.use(cors({
    origin: 'http://localhost:4200'
  }));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")
//     res.setHeader("Authorization", "Bearer your-secret" );
//     next();
//   });
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser()) ;
// app.use(cookieParser());

//Db connection

require("./src/database/connection")

sequelize.authenticate().then(()=>{
    console.log("database connected");
}).catch(err =>{
    console.log(err);
})

const apiRoutes = require("./src/routes/api.routes");
app.use("/api",apiRoutes);

const port = 3000;

app.listen(port,()=>{
    console.log(`server started on ${port}`);
});