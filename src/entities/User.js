const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'integer',
      generated: 'increment',
    },
    userName: {
      type: 'varchar',
      nullable: false,
      unique: true,
    },
    password: {
      type: 'varchar',
      nullable: false,
    },
    name: {
      type: 'varchar',
      nullable: true,
    },
    email: {
      type: 'varchar',
      nullable: true,
      unique: true,
    },
    age: {
      type: 'integer',
      nullable: false,
    },
  },
});
