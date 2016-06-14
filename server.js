var express = require('express')
var mustacheExpress = require('mustache-express')
var app = express()

var logger = require('./middleware/logger')
app.use(logger)
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
// optional. the default is the views folder in the root directory
app.set('views', __dirname + '/views')

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

app.get('(/api)?/user/:user_id', (req, res, next) => {
  // make the database query
  let userId = req.params.user_id
  let user = {
    id: userId,
    name: "phil",
    skills: ["express", "node", "mustache"]
  }
  // if the 1st part of the path is 'api'
  if (req.path.split('/')[1]==='api') {
    // send a json response
    res.json(user)
  }else {
    // otherwise render a view
    // Mustache.render() gets called under the hood because
    // we registered it with app.engine('mustache', mustacheExpress())
    res.render('user', user)
  }
})


app.get('/users', (req, res) => {
  // replace with db query
  let users = [
    {
      id: 3,
      name: "phil",
      skills: ["express", "node", "mustache"]
    },
    {
      id: 4,
      name: "other user",
      skills: ["flask", "python", "jinja"]
    }
  ]
  res.render('users', {users:users})
})

app.listen(3000, () => {
  console.log('listening on port 3000');
})
