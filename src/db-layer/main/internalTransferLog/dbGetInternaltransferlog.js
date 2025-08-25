const { sequelize } = require("common");
const { Op } = require("sequelize");
const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");

const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");

const { DBGetSequelizeCommand } = require("dbCommand");

class DbGetInternaltransferlogCommand extends DBGetSequelizeCommand {
  constructor(input) {
    super(input, InternalTransferLog);
    this.commandName = "dbGetInternaltransferlog";
    this.nullResult = false;
    this.objectName = "internalTransferLog";
    this.serviceLabel = "inventory-transferflow-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (InternalTransferLog.getCqrsJoins)
      await InternalTransferLog.getCqrsJoins(data);
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async checkEntityOwnership(entity) {
    return true;
  }

  async transposeResult() {
    // transpose dbData
  }

  buildIncludes(forWhereClause) {
    if (!this.input.getJoins) forWhereClause = true;
    const includes = [];
    return includes;
  }
}

const dbGetInternaltransferlog = (input) => {
  input.id = input.internalTransferLogId;
  const dbGetCommand = new DbGetInternaltransferlogCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetInternaltransferlog;
