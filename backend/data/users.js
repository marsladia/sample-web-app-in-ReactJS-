const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('password123', 10)
  }
];

module.exports = users;
