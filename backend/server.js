require("dotenv").config();

const express = require  ('express')
const mongoose = require ('mongoose')
const userRoutes = require ('./routes/user')
const songRoutes = require ('./routes/song')

//expres app
const app = express()

//middleware
app.use (express.json())

app.use ((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//routes
//'/api/user/login' or '/api/user/signup' as mentioned in routes/user.js   
app.use('/api/user', userRoutes)

app.use('/api/song' , songRoutes)

//Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log("connect to db & liseteing on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });