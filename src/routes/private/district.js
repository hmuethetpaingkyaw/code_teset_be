import DistrictController from "../../controllers/districtController";
import AdminMiddleware from "../../middlewares/admin";
import { Validate_Request } from "../../controllers";
import { District_Create_Validation } from "../../validations";
import RoleMiddleWare from "../../middlewares/role";

export default (routes) => {
  routes.use(AdminMiddleware);
  routes.get("/district", DistrictController.index);
  routes.get("/district/:id", DistrictController.each);
  routes.post(
    "/district",
    District_Create_Validation,
    Validate_Request,
    RoleMiddleWare,
    DistrictController.store
  );
  routes.put("/district/:id", RoleMiddleWare, DistrictController.update);
  routes.delete("/district/:id", RoleMiddleWare, DistrictController.delete);
};
