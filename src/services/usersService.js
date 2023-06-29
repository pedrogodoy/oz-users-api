const User = require('../entities/User');
const dataSource = require('../db/AppDataSource');
const UserDTO = require('../dtos/UserDTO');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');

class UsersService {
  getAllUsers() {
    return { rows: [] };
  }

  async createUser(user) {
    try {
      const userDTO = new UserDTO();
      Object.assign(userDTO, user);

      const userAlreadyExists = 
        await dataSource.manager.findOne(User, { where: [ { userName: userDTO.userName }, { email: userDTO.email } ]  });
      
      if (userAlreadyExists) {
        throw { validationErrors: 'Username or email already exists.' };
      }

      const validationErrors = userDTO.validate();

      if (validationErrors.length > 0) {
        throw { validationErrors }
      } else {
        const hashedPassword = await hashPassword(user.password);

        await dataSource.manager.save(User, { ...userDTO, password: hashedPassword });
      }
    } catch (err) {
      console.error(err)
      throw err;
    }
  }
}

module.exports = UsersService;