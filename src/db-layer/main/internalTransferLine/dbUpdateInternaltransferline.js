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
  InternalTransferLineQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getInternalTransferLineById = require("./utils/getInternalTransferLineById");

//not
//should i ask this here? is &&false intentionally added?

class DbUpdateInternaltransferlineCommand extends DBUpdateSequelizeCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, InternalTransferLine, instanceMode);
    this.isBulk = false;
    this.commandName = "dbUpdateInternaltransferline";
    this.nullResult = false;
    this.objectName = "internalTransferLine";
    this.serviceLabel = "inventory-transferflow-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransferline-updated";
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
    this.queryCacheInvalidator =
      new InternalTransferLineQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "internalTransferLine",
      this.session,
      this.requestId,
    );
    const dbData = await getInternalTransferLineById(this.dbData.id);
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

const dbUpdateInternaltransferline = async (input) => {
  input.id = input.internalTransferLineId;
  const dbUpdateCommand = new DbUpdateInternaltransferlineCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateInternaltransferline;
