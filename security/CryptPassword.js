module.exports = {
  async cryptPassword(password) {
    const MD5 = require("crypto-js/md5");
    var encodedPassword = await MD5(password).toString();
    return encodedPassword;
  },
};
