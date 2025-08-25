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

const {
  getIdListOfInternalTransferLineByField,
  updateInternalTransferLineById,
  deleteInternalTransferLineById,
} = require("../internalTransferLine");

const {
  InternalTransferQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteSequelizeCommand } = require("dbCommand");

class DbDeleteInternaltransferCommand extends DBSoftDeleteSequelizeCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, InternalTransfer, instanceMode);
    this.commandName = "dbDeleteInternaltransfer";
    this.nullResult = false;
    this.objectName = "internalTransfer";
    this.serviceLabel = "inventory-transferflow-service";
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransfer-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
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
    await elasticIndexer.deleteData(this.dbData.id);
  }

  //should i add this here?

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }

  async syncJoins() {
    const promises = [];
    const dataId = this.dbData.id;
    // relationTargetKey should be used instead of id
    try {
      // delete refrring objects

      // update referring objects

      // delete childs
      const idList_InternalTransferLine_internalTransferId_internalTransfer =
        await getIdListOfInternalTransferLineByField(
          "internalTransferId",
          this.dbData.id,
          false,
        );
      for (const itemId of idList_InternalTransferLine_internalTransferId_internalTransfer) {
        promises.push(deleteInternalTransferLineById(itemId));
      }

      const idList_InternalTransferLog_internalTransferId_internalTransfer =
        await getIdListOfInternalTransferLogByField(
          "internalTransferId",
          this.dbData.id,
          false,
        );
      for (const itemId of idList_InternalTransferLog_internalTransferId_internalTransfer) {
        promises.push(deleteInternalTransferLogById(itemId));
      }

      // update childs

      // delete & update parents ???

      // delete and update referred parents

      const results = await Promise.allSettled(promises);
      for (const result of results) {
        if (result instanceof Error) {
          console.log(
            "Single Error when synching delete of InternalTransfer on joined and parent objects:",
            dataId,
            result,
          );
          hexaLogger.insertError(
            "SyncJoinError",
            { function: "syncJoins", dataId: dataId },
            "->syncJoins",
            result,
          );
        }
      }
    } catch (err) {
      console.log(
        "Total Error when synching delete of InternalTransfer on joined and parent objects:",
        dataId,
        err,
      );
      hexaLogger.insertError(
        "SyncJoinsTotalError",
        { function: "syncJoins", dataId: dataId },
        "->syncJoins",
        err,
      );
    }
  }
}

const dbDeleteInternaltransfer = async (input) => {
  input.id = input.internalTransferId;
  const dbDeleteCommand = new DbDeleteInternaltransferCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteInternaltransfer;
