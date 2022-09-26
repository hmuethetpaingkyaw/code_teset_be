import { body, check, oneOf } from 'express-validator'
import AdminModel from '../models/admin'


export const Admin_Login_Validation = [
  body('email').isLength(1),
  body('password').isLength(1),
]


export const Admin_Create_Validation = [
  body('name').isLength(1),
  body('email').isLength(1),
  body('role').isLength(1),

  check('email').custom(async (email) => {
    const existingUser = await AdminModel.findOne({ where: { email: email } })

    if (existingUser) {
      throw new Error('Email already exists')
    }
  }),
]

export const District_Create_Validation = [
  body("name").isLength(1),
  body("state_region_id").isLength(1),
];
export const Township_Create_Validation = [
  body("name").isLength(1),
  body("district_id").isLength(1),
];
export const State_Region_Create_Validation = [body('name').isLength(1)]
