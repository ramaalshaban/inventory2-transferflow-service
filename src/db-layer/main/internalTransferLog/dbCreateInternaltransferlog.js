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

const { DBCreateSequelizeCommand } = require("dbCommand");

const {
  InternalTransferLogQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getInternalTransferLogById = require("./utils/getInternalTransferLogById");

class DbCreateInternaltransferlogCommand extends DBCreateSequelizeCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateInternaltransferlog";
    this.objectName = "internalTransferLog";
    this.serviceLabel = "inventory-transferflow-service";
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransferlog-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  // should i add hooksDbLayer here?

  // ask about this should i rename the whereClause to dataClause???

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let internalTransferLog = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        internalTransferLog =
          internalTransferLog ||
          (await InternalTransferLog.findByPk(this.dataClause.id));
        if (internalTransferLog) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await internalTransferLog.update(this.dataClause);
          updated = true;
        }
      }
    } catch (error) {
      const eDetail = {
        whereClause: this.normalizeSequalizeOps(whereClause),
        dataClause: this.dataClause,
        errorStack: error.stack,
        checkoutResult: this.input.checkoutResult,
      };
      throw new HttpServerError(
        "Error in checking unique index when creating InternalTransferLog",
        eDetail,
      );
    }

    if (!updated && !exists) {
      internalTransferLog = await InternalTransferLog.create(this.dataClause);
    }

    this.dbData = internalTransferLog.getData();
    this.input.internalTransferLog = this.dbData;
    await this.create_childs();
  }
}

const dbCreateInternaltransferlog = async (input) => {
  const dbCreateCommand = new DbCreateInternaltransferlogCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateInternaltransferlog;
