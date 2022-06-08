const staffSchema = require('../models/staffSch');

module.exports = {
  getUsers: (req, resp, next) => {
    staffSchema.find().byRole('Admin').exec((err, staffs) => {
      resp.json(staffs);
    });
  },
};
