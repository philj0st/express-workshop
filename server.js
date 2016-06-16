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

app.set('port', (process.env.PORT || 8000))

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
  // for serving a whole directory statically use app.use(express.static('public'))
  // http://expressjs.com/en/starter/static-files.html
  res.sendFile(__dirname + '/static/about.html')
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
    avatar: "https://www.gravatar.com/avatar/4373516e408be47bac8b81c04401ba12?s=50",
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
      avatar: "https://images.duckduckgo.com/iur/?f=1&image_host=https%3A%2F%2Fstore.sonyentertainmentnetwork.com%2Fstore%2Fapi%2Fchihiro%2F00_09_000%2Fcontainer%2FCL%2Fen%2F999%2FUP0002-NPUB31217_00-UATEENAGEM000003%2Fimage%3F_version%3D00_09_000%26platform%3Dchihiro%26w%3D124%26h%3D124%26bg_color%3D000000%26opacity%3D100&u=https://store.playstation.com/store/api/chihiro/00_09_000/container/CL/en/999/UP0002-NPUB31217_00-UATEENAGEM000003/image?_version=00_09_000&platform=chihiro&w=124&h=124&bg_color=000000&opacity=100",
      skills: ["express", "node", "mustache"]
    },
    {
      id: 4,
      name: "other user",
      avatar: "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fstore.playstation.com%2Fstore%2Fapi%2Fchihiro%2F00_09_000%2Fcontainer%2FCL%2Fen%2F999%2FUP0002-NPUB31217_00-UATEENAGEM000002%2F1425460721000%2Fimage%3F_version%3D00_09_000%26platform%3Dchihiro%26w%3D124%26h%3D124%26bg_color%3D000000%26opacity%3D100&f=1",
      skills: ["flask", "python", "jinja"]
    }
  ]
  res.render('users', {users:users})
})

app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`)
})
