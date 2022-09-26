import AdminController from '../../controllers/adminController'
import AdminMiddleware from '../../middlewares/admin'
import { Validate_Request } from '../../controllers'
import { Admin_Create_Validation } from '../../validations'
import RoleMiddleware from "../../middlewares/role";

export default (routes) => {
  routes.use(AdminMiddleware)
  routes.get('/admin/info', AdminController.getUserInfo)
  routes.get("/admin", AdminController.index);
  routes.get("/admin/:id", AdminController.each);

  routes.post(
    '/admin/store',
    Admin_Create_Validation,
    Validate_Request,
    RoleMiddleware,
    AdminController.store
  )
  
  routes.put('/admin/:id', RoleMiddleware,AdminController.update)
  routes.delete('/admin/:id',RoleMiddleware, AdminController.delete)
}
