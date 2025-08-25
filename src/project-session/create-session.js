module.exports = {
  createSession: () => {
    const SessionManager = require("./inventory-session");
    return new SessionManager();
  },
};
