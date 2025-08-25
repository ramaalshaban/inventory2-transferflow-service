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

class DbGetInternaltransferlineCommand extends DBGetSequelizeCommand {
  constructor(input) {
    super(input, InternalTransferLine);
    this.commandName = "dbGetInternaltransferline";
    this.nullResult = false;
    this.objectName = "internalTransferLine";
    this.serviceLabel = "inventory-transferflow-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (InternalTransferLine.getCqrsJoins)
      await InternalTransferLine.getCqrsJoins(data);
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

const dbGetInternaltransferline = (input) => {
  input.id = input.internalTransferLineId;
  const dbGetCommand = new DbGetInternaltransferlineCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetInternaltransferline;
