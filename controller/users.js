const staffSchema = require('../models/staffSch');

module.exports = {
  getUsers: async (req, resp, next) => {
    try {
      const data = await staffSchema.find();
      resp.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  },
};
