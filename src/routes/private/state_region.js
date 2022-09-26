import StateRegionController from "../../controllers/StateRegionController";
import AdminMiddleware from "../../middlewares/admin";
import { Validate_Request } from "../../controllers";
import { State_Region_Create_Validation } from "../../validations";
import RoleMiddleWare from "../../middlewares/role";

export default (routes) => {
  routes.use(AdminMiddleware);
  routes.post(
    "/state-region",
    State_Region_Create_Validation,
    Validate_Request,
    RoleMiddleWare,
    StateRegionController.store
  );
  routes.put("/state-region/:id", RoleMiddleWare, StateRegionController.update);
  routes.delete(
    "/state-region/:id",
    RoleMiddleWare,
    StateRegionController.delete
  );
  routes.get("/state-region", StateRegionController.index);
  routes.get("/state-region/:id", StateRegionController.each);
};
