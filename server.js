const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")
const app = express()
const PORT = process.env.PORT || 3001
const bodyParser = require("body-parser")
const socket = require('socket.io')

// Define middleware here
app.use(express.urlencoded({ extended: true }))
//app.use(express.json())
app.use(bodyParser({limit: '50mb'}))
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
// Add routes, both API and view
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bookkeeping")

// Start the API server
let server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

let io = socket(server)

io.on('connection', socket => {
  console.log('Made socket connection')
  socket.on('notification', function(msg) {
    io.emit('notification', msg)
  })
  socket.on('disconnect', function() {
    console.log('User disconnected')
  })
})
