let DB = [
  { id: 1, name: 'Pedro', userName: 'pedrogodoy'}
]

class UsersService {
  getAllUsers() {
    return DB;
  }
}

module.exports = UsersService;