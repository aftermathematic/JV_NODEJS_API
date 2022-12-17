module.exports = {
  isEmail: function (str) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (str !== "" && str.match(emailFormat)) {
      return true;
    }
    return false;
  },
  isAlphaNumeric: function (str) {
    return /^[A-Za-z\s]*$/.test(str) && /[A-Za-z]/.test(str) && /\s/.test(str);
  },
  isValidBirthday: function (str) {
    var dateFormat = /^\d{4}-\d{2}-\d{2}$/;

    if (typeof str !== "undefined") {
      if (str !== null && str !== "" && str.match(dateFormat)) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  },
};
