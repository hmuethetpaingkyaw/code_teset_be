import TownshipController from "../../controllers/townshipController";
import AdminMiddleware from "../../middlewares/admin";
import { Validate_Request } from "../../controllers";
import { Township_Create_Validation } from "../../validations";
import RoleMiddleWare from "../../middlewares/role";

export default (routes) => {
  routes.use(AdminMiddleware);
  routes.post(
    "/township",
    Township_Create_Validation,
    Validate_Request,
    RoleMiddleWare,
    TownshipController.store
  );
  routes.put("/township/:id", RoleMiddleWare, TownshipController.update);
  routes.delete("/township/:id", RoleMiddleWare, TownshipController.delete);
  routes.get("/township", TownshipController.index);
  routes.get("/township/:id", TownshipController.each);
};
