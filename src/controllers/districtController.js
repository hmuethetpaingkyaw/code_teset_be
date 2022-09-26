import DistrictModel from '../models/district'
import StateRegionModel from '../models/state_region';

class DistrictController {
  async store(req, res) {
    try {
      let { name, state_region_id } = req.body;

      const district = await DistrictModel.create({
        name: name,
        state_region_id: state_region_id,
      });

      return res.status(200).json({ data: district })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error saving district' })
    }
  }
  async index(req, res) {
    try {
      
      const result = await DistrictModel.findAll({
        include: [
          {
            model: StateRegionModel,
            as : "state_region"
          }
        ]
      })
      return res.status(200).json({ data: result })
    } catch (error) {
      res.status(401).json({ message: error })
    }
  }
  async each(req, res) {
    try {
      const result = await DistrictModel.findOne({
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'District Not Found' })
      }
      return res.status(200).json({ data: result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error })
    }
  }
  async update(req, res) {
    try {
      const result = await DistrictModel.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'district Not Found' })
      }
      return res.status(200).json({ message: 'Successfully Updated' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'error' })
    }
  }
    async delete(req, res) {

    try {
      const result = await DistrictModel.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (!result) {
        return res.status(404).json({ message: 'District Not Found' })
      }
      return res.status(200).json({ message: 'Successfully Deleted' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'error' })
    }
   }
}

export default new DistrictController()
