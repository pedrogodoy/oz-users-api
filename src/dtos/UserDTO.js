const { validate } = require('class-validator');

class UserDTO {
  userName;

  email;

  password;

  age;

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

    if(!this.age) {
      errors.push('Age is required');
    }
    if (this.age && this.age < 18) {
      errors.push('User cannot be less than 18 years old');
    }

    return errors;
  }
}

module.exports = UserDTO;