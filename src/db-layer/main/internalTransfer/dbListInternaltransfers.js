const { DBGetListSequelizeCommand } = require("dbCommand");
const { sequelize, hexaLogger } = require("common");
const { Op } = require("sequelize");
const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");

class DbListInternaltransfersCommand extends DBGetListSequelizeCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbListInternaltransfers";
    this.emptyResult = true;
    this.objectName = "internalTransfers";
    this.serviceLabel = "inventory-transferflow-service";
    this.input.pagination = null;
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  // should i add this here?

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    for (const internalTransfer of this.dbData.items) {
      // tarnspose dbData item
    }
  }

  buildIncludes(forWhereClause) {
    if (!this.input.getJoins) forWhereClause = true;
    const includes = [];
    return includes;
  }

  async getCqrsJoins(item) {
    if (InternalTransfer.getCqrsJoins) {
      await InternalTransfer.getCqrsJoins(item);
    }
  }

  async executeQuery() {
    const input = this.input;
    let options = { where: this.whereClause };
    if (input.sortBy) options.order = input.sortBy ?? [["id", "ASC"]];

    options.include = this.buildIncludes();
    if (options.include && options.include.length == 0) options.include = null;

    if (!input.getJoins) {
      options.include = null;
    }

    let internalTransfers = null;

    const selectList = this.getSelectList();
    if (selectList && selectList.length) {
      options.attributes = selectList;
    }

    internalTransfers = await InternalTransfer.findAll(options);

    return internalTransfers;
  }
}

const dbListInternaltransfers = (input) => {
  const dbGetListCommand = new DbListInternaltransfersCommand(input);
  return dbGetListCommand.execute();
};

module.exports = dbListInternaltransfers;
