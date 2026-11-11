const bcrypt = require('bcrypt');
const config = require('../config');

// La contraseña real vive en SEED_STAFF_PASSWORD (ver .env.example); este
// valor es solo un fallback para no romper un `npm run seed` local sin
// configurar, nunca se usa si la variable está definida.
const seedPassword = bcrypt.hashSync(config.seedStaffPassword || 'burgerqueen123', 10);

const seedStaff = [
  {
    role: 'Admin',
    name: 'Maggie',
    lastname: 'Sarmiento',
    email: 'gsmaggie001@gmail.com',
    password: seedPassword,
    date: '2022-05-05',
  },
  {
    role: 'Admin',
    name: 'Skarlet',
    lastname: 'Araque',
    email: 'skarlet15m@gmail.com',
    password: seedPassword,
    date: '2022-05-09',
  },
  {
    date: '2022-05-09',
    role: 'Admin',
    name: 'Sara',
    lastname: 'Rojas',
    email: 'sara@gmail.com',
    password: seedPassword,
  },
];

module.exports = seedStaff;
