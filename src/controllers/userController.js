const Router = require('koa-router');
const UsersService = require('../services/usersService');

const usersController = new Router();
const users = new UsersService();

usersController.get('/users', async (ctx) => {
  ctx.body = users.getAllUsers();
});

usersController.get('/users/:id', async (ctx) => {
  const userId = ctx.params.id;
  ctx.body = `User with ID ${userId}`;
});

usersController.post('/users', async (ctx) => {
  const body = ctx.request.body;
  users.createUser(body)

  ctx.status = 201;
});

usersController.put('/users/:id', async (ctx) => {
  // Update user information
});

usersController.delete('/users/:id', async (ctx) => {
  //Delete user information from the database or any other data source
});


module.exports = usersController;