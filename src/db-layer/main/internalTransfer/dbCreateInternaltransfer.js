const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { InternalTransfer } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const { DBCreateSequelizeCommand } = require("dbCommand");

const {
  InternalTransferQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getInternalTransferById = require("./utils/getInternalTransferById");

class DbCreateInternaltransferCommand extends DBCreateSequelizeCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateInternaltransfer";
    this.objectName = "internalTransfer";
    this.serviceLabel = "inventory-transferflow-service";
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransfer-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  // should i add hooksDbLayer here?

  // ask about this should i rename the whereClause to dataClause???

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let internalTransfer = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        internalTransfer =
          internalTransfer ||
          (await InternalTransfer.findByPk(this.dataClause.id));
        if (internalTransfer) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await internalTransfer.update(this.dataClause);
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
        "Error in checking unique index when creating InternalTransfer",
        eDetail,
      );
    }

    if (!updated && !exists) {
      internalTransfer = await InternalTransfer.create(this.dataClause);
    }

    this.dbData = internalTransfer.getData();
    this.input.internalTransfer = this.dbData;
    await this.create_childs();
  }
}

const dbCreateInternaltransfer = async (input) => {
  const dbCreateCommand = new DbCreateInternaltransferCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateInternaltransfer;
