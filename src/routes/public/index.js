import AdminController from '../../controllers/adminController'
import { Validate_Request } from '../../controllers'
import {
  Admin_Login_Validation,
} from '../../validations'

export default (routes) => {
  routes.post(
    '/admin/login',
    Admin_Login_Validation,
    Validate_Request,
    AdminController.login
  )
}
