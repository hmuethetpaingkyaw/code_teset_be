import DB_CONNECTION from "../database";
import { DataTypes } from "sequelize";
import DistrictModel from "./district";
const TownshipModel = DB_CONNECTION.define("township", {
  name: DataTypes.TEXT,
  district_id: DataTypes.INTEGER,
});
(async () => {
  await DB_CONNECTION.sync({ force: false });
})();

TownshipModel.belongsTo(DistrictModel, {
  foreignKey: "district_id",
  onDelete: "CASCADE",
});
export default TownshipModel;
