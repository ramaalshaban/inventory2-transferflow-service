const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { InternalTransferLine } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const { DBCreateSequelizeCommand } = require("dbCommand");

const {
  InternalTransferLineQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getInternalTransferLineById = require("./utils/getInternalTransferLineById");

class DbCreateInternaltransferlineCommand extends DBCreateSequelizeCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateInternaltransferline";
    this.objectName = "internalTransferLine";
    this.serviceLabel = "inventory-transferflow-service";
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransferline-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  // should i add hooksDbLayer here?

  // ask about this should i rename the whereClause to dataClause???

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let internalTransferLine = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      if (!updated && this.dataClause.id && !exists) {
        internalTransferLine =
          internalTransferLine ||
          (await InternalTransferLine.findByPk(this.dataClause.id));
        if (internalTransferLine) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await internalTransferLine.update(this.dataClause);
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
        "Error in checking unique index when creating InternalTransferLine",
        eDetail,
      );
    }

    if (!updated && !exists) {
      internalTransferLine = await InternalTransferLine.create(this.dataClause);
    }

    this.dbData = internalTransferLine.getData();
    this.input.internalTransferLine = this.dbData;
    await this.create_childs();
  }
}

const dbCreateInternaltransferline = async (input) => {
  const dbCreateCommand = new DbCreateInternaltransferlineCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateInternaltransferline;
