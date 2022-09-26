import { validationResult } from 'express-validator'
export function Validate_Request(req, res, next) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  } else next()
}
