import DB_CONNECTION from "../database";
import { DataTypes } from "sequelize";
import StateRegionModel from "./state_region";
const DistrictModel = DB_CONNECTION.define("district", {
  name: DataTypes.TEXT,
  state_region_id: DataTypes.INTEGER,
});
(async () => {
  await DB_CONNECTION.sync({ force: false });
})();

DistrictModel.belongsTo(StateRegionModel, {
  foreignKey: "state_region_id",
  onDelete: "CASCADE",
});

export default DistrictModel;
