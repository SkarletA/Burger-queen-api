const {
  getUsers,
} = require('../users');

describe('getUsers', () => {
  it('should get users collection', (done) => {
    // const mockStaffSchema = { name: 'jose' },
    expect(getUsers).toBe(200);
    done();
  });
});
