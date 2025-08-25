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

class DbGetInternaltransferbystatusCommand extends DBGetSequelizeCommand {
  constructor(input) {
    super(input, InternalTransfer);
    this.commandName = "dbGetInternaltransferbystatus";
    this.nullResult = true;
    this.objectName = "internalTransfer";
    this.serviceLabel = "inventory-transferflow-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (InternalTransfer.getCqrsJoins)
      await InternalTransfer.getCqrsJoins(data);
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

const dbGetInternaltransferbystatus = (input) => {
  input.id = input.internalTransferId;
  const dbGetCommand = new DbGetInternaltransferbystatusCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetInternaltransferbystatus;
