const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { InternalTransferLog } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const {
  InternalTransferLogQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteSequelizeCommand } = require("dbCommand");

class DbDeleteInternaltransferlogCommand extends DBSoftDeleteSequelizeCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, InternalTransferLog, instanceMode);
    this.commandName = "dbDeleteInternaltransferlog";
    this.nullResult = false;
    this.objectName = "internalTransferLog";
    this.serviceLabel = "inventory-transferflow-service";
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransferlog-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new InternalTransferLogQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "internalTransferLog",
      this.session,
      this.requestId,
    );
    await elasticIndexer.deleteData(this.dbData.id);
  }

  //should i add this here?

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbDeleteInternaltransferlog = async (input) => {
  input.id = input.internalTransferLogId;
  const dbDeleteCommand = new DbDeleteInternaltransferlogCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteInternaltransferlog;
