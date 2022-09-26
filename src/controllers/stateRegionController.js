import StateRegionModel from '../models/state_region'
import { Op } from 'sequelize'

class StateRegionController {
  async store(req, res) {
    try {
      let { name } = req.body

      const state_region = await StateRegionModel.create({
        name: name,
      })

      return res.status(200).json({ data: state_region })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error saving state/region' })
    }
  }
  async index(req, res) {
    try {
      let query = {};
      if (req.query.search) {
        query.name = {
          [Op.like]: `%${req.query.search}%`,
        };
        console.log(req.query.search);
      }
      const result = await StateRegionModel.findAll({where :query})
      return res.status(200).json({ data: result })
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error })
    }
  }
  async each(req, res) {
    try {
      const result = await StateRegionModel.findOne({
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'state/region Not Found' })
      }
      
      return res.status(200).json({ data: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error })
    }
  }
  async update(req, res) {
    try {
      console.log(new Date(req.body.createdAt));
      const result = await StateRegionModel.update(
        req.body,{
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'state_region Not Found' })
      }
      return res.status(200).json({ message: 'Successfully Updated' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'error' })
    }
  }
  async delete(req, res) {
    try {
      const result = await StateRegionModel.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'state_region Not Found' })
      }
      return res.status(200).json({ message: 'Successfully Deleted' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'error' })
    }
  }
}

export default new StateRegionController()
