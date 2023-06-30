const Router = require('koa-router');
const UsersService = require('../services/usersService');

const usersController = new Router();
const users = new UsersService();

usersController.get('/users', async (ctx) => {
  try {
    ctx.body = await users.getAllUsers(ctx.query.page || 1, 10);

  } catch (err) {
    if (err.validationErrors) {
      ctx.status = 400;
      ctx.body = err;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal error' };
    }
  }
});

usersController.get('/users/:username', async (ctx) => {
  const username = ctx.params.username;
  try {
    ctx.body = await users.getUser(username);

  } catch (err) {
    if (err.validationErrors) {
      ctx.status = 404;
      ctx.body = err;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal error' };
    }
  }
});

usersController.post('/users', async (ctx) => {
  try {
    const body = ctx.request.body;
    await users.createUser(body)
  
    ctx.status = 201;
  } catch(err) {
    if (err.validationErrors) {
      ctx.status = 400;
      ctx.body = err;
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal error' };
    }
  }
  
});

usersController.put('/users/:id', async (ctx) => {
  // Update user information
});

usersController.delete('/users/:id', async (ctx) => {
  //Delete user information from the database or any other data source
});


module.exports = usersController;