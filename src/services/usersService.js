let DB = [
  { id: 1, name: 'Pedro', userName: 'pedrogodoy'}
]

class UsersService {
  getAllUsers() {
    return DB;
  }

  createUser(user) {
    DB.push(user);
  }
}

module.exports = UsersService;