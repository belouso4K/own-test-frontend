export default function(req, res, next) {
  const url = req.originalUrl.split('/')

  if(url[1] === 'admin') {
    res.spa = true

  }
  next()
}

