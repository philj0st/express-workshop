var express = require('express')
var app = express()

// register callbacks to routes
app.get('/', (req, res) => {
  let now = new Date().toUTCString()

  // with access to response objects
  // http://expressjs.com/en/4x/api.html#res
  res.send(`<h1>welcome</h1><p>it is ${now}</p>`)
})

// the response object has different send options
// http://expressjs.com/en/guide/routing.html#response-methods
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/about.html')
})

// routes support simple wildcards and/or regex
// http://expressjs.com/en/guide/routing.html#route-paths
app.get('/rc-*', (req, res) => {
  // and access to the request object
  // http://expressjs.com/en/4x/api.html#req
  let path = req.path
  res.send(`sucessfully routed to ${path}`)
})

app.get('/user/:user_id', (req,res) => {
  let userId = req.params.user_id
  // make some db query for userId here
  let user = {
    id: userId,
    name: "phil",
  }
  // send JSON response
  res.json(user)
})

app.listen(3000, () => {
  console.log('listening on port 3000');
})
