function RegistrationController(UserService, $state) {
  this.user = UserService.current;

  this.countryCodes = [
    {label: 'India (+91)', value: '91'},
    {label: 'UK (+44)', value: '44'},
    {label: 'USA (+1)', value: '1'}
  ];

  this.phone = {
    cc: null,
    number: null
  };

  this.submit = function (phone) {
    try {
      this.user.setPhone(phone.cc, phone.number);
    } catch (e) {
      this.error = e.message;
      return false;
    }
    // TODO: implement db submission
    return $state.go('choice');
  };
}

module.exports = RegistrationController;
