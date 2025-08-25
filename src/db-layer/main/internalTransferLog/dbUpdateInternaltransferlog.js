const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");
const { Op } = require("sequelize");
const { sequelize } = require("common");

const { DBUpdateSequelizeCommand } = require("dbCommand");

const {
  InternalTransferLogQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getInternalTransferLogById = require("./utils/getInternalTransferLogById");

//not
//should i ask this here? is &&false intentionally added?

class DbUpdateInternaltransferlogCommand extends DBUpdateSequelizeCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, InternalTransferLog, instanceMode);
    this.isBulk = false;
    this.commandName = "dbUpdateInternaltransferlog";
    this.nullResult = false;
    this.objectName = "internalTransferLog";
    this.serviceLabel = "inventory-transferflow-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransferlog-updated";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async transposeResult() {
    // transpose dbData
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
    const dbData = await getInternalTransferLogById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }

  buildIncludes(forWhereClause) {
    if (!this.input.getJoins) forWhereClause = true;
    const includes = [];
    return includes;
  }
}

const dbUpdateInternaltransferlog = async (input) => {
  input.id = input.internalTransferLogId;
  const dbUpdateCommand = new DbUpdateInternaltransferlogCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateInternaltransferlog;
