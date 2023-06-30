const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  type: 'sqlite',
  database: process.env.NODE_ENV === 'test' ? './database.test.db' : './database.db',
  synchronize: true,
  logging: false,
  entities: [
    require("../entities/User.js"),
  ],

});

module.exports = dataSource;