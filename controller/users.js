const staffSchema = require('../models/staffSch');

module.exports = {
  getUsers: async (req, resp, next) => {
    if (!req.headers) return next(401);
    try {
      const data = await staffSchema.find().exec();
      resp.status(200).json(data);
      if (!data) return next(403);
    } catch (error) {
      return next(error);
    }
  },
};
