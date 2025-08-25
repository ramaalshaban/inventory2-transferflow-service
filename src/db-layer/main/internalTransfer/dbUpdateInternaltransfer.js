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
  InternalTransferQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getInternalTransferById = require("./utils/getInternalTransferById");

//not
//should i ask this here? is &&false intentionally added?

class DbUpdateInternaltransferCommand extends DBUpdateSequelizeCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, InternalTransfer, instanceMode);
    this.isBulk = false;
    this.commandName = "dbUpdateInternaltransfer";
    this.nullResult = false;
    this.objectName = "internalTransfer";
    this.serviceLabel = "inventory-transferflow-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransfer-updated";
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
    this.queryCacheInvalidator = new InternalTransferQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "internalTransfer",
      this.session,
      this.requestId,
    );
    const dbData = await getInternalTransferById(this.dbData.id);
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

const dbUpdateInternaltransfer = async (input) => {
  input.id = input.internalTransferId;
  const dbUpdateCommand = new DbUpdateInternaltransferCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateInternaltransfer;
