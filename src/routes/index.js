import { Router } from 'express'
import { rateLimit } from 'express-rate-limit'
import PublicRoutes from './public'
import AdminRoutes from './private/admin'
import TownshipRoutes from './private/township'
import DistrictRoutes from './private/district'
import StateRegionRoutes from './private/state_region'


export default (app) => {
  const routes = Router()
  const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message:
      'Too many requests from this IP, please try again after 10 minutes.',
  })
  PublicRoutes(routes)
  AdminRoutes(routes)
  TownshipRoutes(routes);
  DistrictRoutes(routes)
  StateRegionRoutes(routes)
  
  // important if behind a proxy to ensure client IP is passed to req.ip
  // app.enable('trust proxy')

  app.use('/api/', [apiLimiter, routes])
}
