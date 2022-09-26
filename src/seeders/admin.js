import AdminModel from './../models/admin.js'
import bcrypt from 'bcrypt'
AdminModel.destroy({
  where: {},
  truncate: true,
})

const ADMINS = [
  {
    name: "union",
    email: "Unionais2022@gmail.com",
    password: "unionais@!2022",
    role: "admin",
  },
  {
    name: "project manager",
    email: "projectmanager@gmail.com",
    password: "projectmanager",
    role: "project manager",
  },
];

ADMINS.forEach(async (admin) => {
  try {
    const salt = await bcrypt.genSalt(10)
    // now we set user password to hashed password
    admin.password = await bcrypt.hash(admin.password, salt)
    const savedData = AdminModel.build(admin)
    await savedData.save()
  } catch (error) {
    console.log(error)
  }
})
