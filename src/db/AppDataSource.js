const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  type: 'sqlite',
  database: './database.db',
  synchronize: true,
  logging: true,
  entities: [
    require("../entities/User.js"),
  ],

});

module.exports = dataSource;