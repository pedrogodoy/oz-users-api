const User = require('../entities/User');
const dataSource = require('../db/AppDataSource');
const UserDTO = require('../dtos/UserDTO');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');

class UsersService {
  async getAllUsers(page, pageSize) {
    try {
      const skipCount = (page - 1) * pageSize;
      
      const totalCount = await dataSource.manager.count(User);
      const totalPages = Math.ceil(totalCount / pageSize);

      const results = await dataSource.manager.find(User, {
        skip: skipCount,
        take: pageSize,
      });

      if (results.length === 0) {
        return { rows: [] }
      }

      if (page > totalPages || page < 0) {
        throw { validationErrors: 'Invalid page' };
      }

      return {
        maxItemPerPage: pageSize,
        totalPages,
        rows: results
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
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
      throw err;
    }
  }
}

module.exports = UsersService;