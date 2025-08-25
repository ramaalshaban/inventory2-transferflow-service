const { NotAuthenticatedError, ForbiddenError } = require("common");
const { hexaLogger } = require("common");
const HexaAuth = require("./hexa-auth");

class InventorySession extends HexaAuth {
  constructor() {
    super();
    this.ROLES = {
      superAdmin: "superAdmin",

      admin: "admin",
      user: "user",
      userManager: "userManager",
    };

    this.projectName = "inventory";
    this.projectCodename = "inventory2";
    this.isJWT = true;
    this.isJWTAuthRSA = true;
    this.isRemoteAuth = false;
    this.useRemoteSession = false;
  }

  userHasRole(roleName) {
    const userRoleInSession = this.session?.roleId;
    if (!userRoleInSession) return false;
    return Array.isArray(userRoleInSession)
      ? userRoleInSession.includes(roleName)
      : userRoleInSession == roleName;
  }
}

module.exports = InventorySession;
