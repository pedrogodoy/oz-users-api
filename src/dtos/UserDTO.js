const { validate } = require('class-validator');

class UserDTO {
  userName;

  email;

  password;

  validate() {
    const errors = [];

    if (!this.userName || this.userName.trim() === '') {
      errors.push('Username is required');
    }

    if (!this.password || this.password.trim() === '') {
      errors.push('Password is required');
    }

    if (this.email && !this.email.includes('@')) {
      errors.push('Email is invalid');
    }

    return errors;
  }
}

module.exports = UserDTO;