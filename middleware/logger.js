module.exports = (req, res, next) => {
  let now = new Date().toUTCString()
  // of course we could also write this to a file
  console.log(`${now}: ${req.ip} sent a ${req.method} to ${req.hostname}${req.path}`)
  next()
}
