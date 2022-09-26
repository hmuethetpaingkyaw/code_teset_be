import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import AdminModel from "../models/admin";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { getPaginationAttribute } from "../util";
class AdminController {
  async login(req, res) {
    dotevn.config();
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({
      where: {
        email: email,
      },
    });

    if (!admin) return res.status(405).json({ message: "email not found" });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res.status(405).json({ message: "password doesnt' match" });

    const responseObj = {
      admin: {
        name: admin.name,
        role: admin.role,
        email: admin.email,
      },
      token: jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET
      ),
    };

    return res
      .status(200)
      .json({ message: "Login Success", data: responseObj });
  }
  async getUserInfo(req, res) {
    const admin = await AdminModel.findOne({
      where: {
        id: req.id,
      },
    });
    const { name, role, email, id } = admin;
    return res.status(400).json({ data: { name, role, email, id } });
  }
  async store(req, res) {
    try {
      let { name, email, role } = req.body;
      let password = Math.floor(Math.random() * 1000000 + 1).toString();
      console.log(password);
      const salt = await bcrypt.genSalt(10);
      // now we set user password to hashed password
      const hashedPassword = await bcrypt.hash(password, salt);
      const admin = await AdminModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });

      return res.status(200).json({ data: admin });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error saving user" });
    }
  }
  async index(req, res) {
    try {
      const AccountCount = await AdminModel.count();
      let { limit, offset, page, totalPage } = getPaginationAttribute(
        req,
        AccountCount
      );
      let query = {};
      if (req.query.search) {
        query = {
          [Op.or]: [
            {
              email: {
                [Op.like]: `%${req.query.search}%`,
              },
            },
            {
              role: {
                [Op.like]: `%${req.query.search}%`,
              },
            },
          ],
        };
      }
      const result = await AdminModel.findAll({
        where: query,
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]],
      });
      result.pages = page;

      return res.status(200).json({
        data: {
          accounts: result,
          page: page,
          count: AccountCount,
          totalPage: totalPage,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  }
  async each(req, res) {
    try {
      const result = await AdminModel.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!result) {
        return res.status(404).json({ message: "User Not Found" });
      }
      return res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
  async update(req, res) {
    try {
      const result = await AdminModel.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!result) {
        return res.status(404).json({ message: "Admin Not Found" });
      }
      return res.status(200).json({ message: "Successfully Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  }
  async delete(req, res) {
    try {
      const result = await AdminModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!result) {
        return res.status(404).json({ message: "Admin Not Found" });
      }
      return res.status(200).json({ message: "Successfully Deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  }
}

export default new AdminController();
