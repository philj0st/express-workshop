module.exports = (req, res, next) => {
  let now = new Date()
  // of course we could also write this to a file
  console.log(`${now.toUTCString()}: ${req.ip} sent a ${req.method} to ${req.hostname}${req.path}`)
  // or add things to the req or res objects like this
  // added properties become available in following route handler and middlewares
  // makes it extremely easy to use 3rd party middlewares
  req.requestTime = now
  next()
}
