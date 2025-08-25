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

const {
  getIdListOfInternalTransferLogByField,
  updateInternalTransferLogById,
  deleteInternalTransferLogById,
} = require("../internalTransferLog");

const {
  InternalTransferLineQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteSequelizeCommand } = require("dbCommand");

class DbDeleteInternaltransferlineCommand extends DBSoftDeleteSequelizeCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, InternalTransferLine, instanceMode);
    this.commandName = "dbDeleteInternaltransferline";
    this.nullResult = false;
    this.objectName = "internalTransferLine";
    this.serviceLabel = "inventory-transferflow-service";
    this.dbEvent =
      "inventory2-transferflow-service-dbevent-internaltransferline-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
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
      const idList_InternalTransferLog_transferLineId_internalTransferLine =
        await getIdListOfInternalTransferLogByField(
          "transferLineId",
          this.dbData.id,
          false,
        );
      for (const itemId of idList_InternalTransferLog_transferLineId_internalTransferLine) {
        promises.push(
          updateInternalTransferLogById(itemId, { transferLineId: null }),
        );
      }

      // delete childs

      // update childs

      // delete & update parents ???

      // delete and update referred parents

      const results = await Promise.allSettled(promises);
      for (const result of results) {
        if (result instanceof Error) {
          console.log(
            "Single Error when synching delete of InternalTransferLine on joined and parent objects:",
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
        "Total Error when synching delete of InternalTransferLine on joined and parent objects:",
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

const dbDeleteInternaltransferline = async (input) => {
  input.id = input.internalTransferLineId;
  const dbDeleteCommand = new DbDeleteInternaltransferlineCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteInternaltransferline;
