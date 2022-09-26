import { promisify } from 'util'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  dotenv.config()
  const { authorization } = req.headers
  if (!authorization)
    req.json(401).json({
      message: 'Unauthorized Request',
      howToFix: 'You forgot to send your authorization token',
    })
  if (authorization.indexOf('Bearer') !== 0)
    req.json(401).json({
      message: 'Malformatted token',
      howToFix: 'Please provide a valid authorization token',
    })

  const [, token] = authorization.split(' ')
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    req.id = decoded.id
    if (decoded.role == 'project manager')
      return res.status(401).json({
        message: 'Invalid token.',
        howToFix: 'You are not an admin or M&E manager.',
    })

  } catch (err) {
    console.log('midlewares.auth', err.message)
    return res.status(401).json({
      message: 'Invalid token.',
      howToFix: 'Provide a valid authorization token.',
    })
  }
  return next()
}
