var User = require('../models/User');

function UserService() {
  // angular treats services as singletons
  // so constructor is only called once
  this.current = new User();
}

module.exports = UserService;