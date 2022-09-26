import DB_CONNECTION from '../database'
import { DataTypes } from 'sequelize'

const AdminModel = DB_CONNECTION.define('account', {
  name: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
  role: DataTypes.TEXT,
})
;(async () => {
  await DB_CONNECTION.sync({ force: false })
})()

export default AdminModel
