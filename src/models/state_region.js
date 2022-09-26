import DB_CONNECTION from '../database'
import { DataTypes } from 'sequelize';

const StateRegionModel = DB_CONNECTION.define('state_region', {
  name: DataTypes.TEXT,
})
;(async () => {
  await DB_CONNECTION.sync({ force: false })
})()



export default StateRegionModel;
