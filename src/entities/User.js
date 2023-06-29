const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: 'increment',
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
  },
});
