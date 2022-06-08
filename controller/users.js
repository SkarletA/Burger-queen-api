const staffSchema = require('../models/staffSch');

module.exports = {
  getUsers: (req, resp, next) => {
    staffSchema.find().exec((err, staffs) => {
      resp.json(staffs);
    });
  },
};
