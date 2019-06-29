const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

const PROTECTED = ensureLoggedIn("/login");

module.exports = PROTECTED;
