import DistrictModel from '../models/district';
import TownshipModel from '../models/township'

class TownshipController {
  async store(req, res) {
    try {
      let { name, district_id } = req.body;

      const township = await TownshipModel.create({
        name: name,
        district_id: district_id,
      });

      return res.status(200).json({ data: township })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error saving township' })
    }
  }
  async index(req, res) {
    try {
      
      const result = await TownshipModel.findAll({
        include: [
          {
            model: DistrictModel,
            as: "district",
          },
        ],
      });
      return res.status(200).json({ data: result })
    } catch (error) {
      res.status(401).json({ message: error })
    }
  }
  async each(req, res) {
    try {
      const result = await TownshipModel.findOne({
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'township Not Found' })
      }
      return res.status(200).json({ data: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error })
    }
  }
  async update(req, res) {
    try {
      const result = await TownshipModel.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'township Not Found' })
      }
      return res.status(200).json({ message: 'Successfully Updated' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'error' })
    }
  }
    async delete(req, res) {

    try {
      const result = await TownshipModel.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'township Not Found' })
      }
      return res.status(200).json({ message: 'Successfully Deleted' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'error' })
    }
   }
}

export default new TownshipController()
