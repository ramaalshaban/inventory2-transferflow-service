const internalTransferFunctions = require("./internalTransfer");
const internalTransferLineFunctions = require("./internalTransferLine");
const internalTransferLogFunctions = require("./internalTransferLog");
const transferFlowShareTokenFunctions = require("./transferFlowShareToken");

module.exports = {
  // main Database
  // InternalTransfer Db Object
  dbGetInternaltransfer: internalTransferFunctions.dbGetInternaltransfer,
  dbGetInternaltransferbystatus:
    internalTransferFunctions.dbGetInternaltransferbystatus,
  dbCreateInternaltransfer: internalTransferFunctions.dbCreateInternaltransfer,
  dbUpdateInternaltransfer: internalTransferFunctions.dbUpdateInternaltransfer,
  dbDeleteInternaltransfer: internalTransferFunctions.dbDeleteInternaltransfer,
  dbListInternaltransfers: internalTransferFunctions.dbListInternaltransfers,
  createInternalTransfer: internalTransferFunctions.createInternalTransfer,
  getIdListOfInternalTransferByField:
    internalTransferFunctions.getIdListOfInternalTransferByField,
  getInternalTransferById: internalTransferFunctions.getInternalTransferById,
  getInternalTransferAggById:
    internalTransferFunctions.getInternalTransferAggById,
  getInternalTransferListByQuery:
    internalTransferFunctions.getInternalTransferListByQuery,
  getInternalTransferStatsByQuery:
    internalTransferFunctions.getInternalTransferStatsByQuery,
  getInternalTransferByQuery:
    internalTransferFunctions.getInternalTransferByQuery,
  updateInternalTransferById:
    internalTransferFunctions.updateInternalTransferById,
  updateInternalTransferByIdList:
    internalTransferFunctions.updateInternalTransferByIdList,
  updateInternalTransferByQuery:
    internalTransferFunctions.updateInternalTransferByQuery,
  deleteInternalTransferById:
    internalTransferFunctions.deleteInternalTransferById,
  deleteInternalTransferByQuery:
    internalTransferFunctions.deleteInternalTransferByQuery,

  // InternalTransferLine Db Object
  dbGetInternaltransferline:
    internalTransferLineFunctions.dbGetInternaltransferline,
  dbCreateInternaltransferline:
    internalTransferLineFunctions.dbCreateInternaltransferline,
  dbUpdateInternaltransferline:
    internalTransferLineFunctions.dbUpdateInternaltransferline,
  dbDeleteInternaltransferline:
    internalTransferLineFunctions.dbDeleteInternaltransferline,
  dbListInternaltransferlines:
    internalTransferLineFunctions.dbListInternaltransferlines,
  createInternalTransferLine:
    internalTransferLineFunctions.createInternalTransferLine,
  getIdListOfInternalTransferLineByField:
    internalTransferLineFunctions.getIdListOfInternalTransferLineByField,
  getInternalTransferLineById:
    internalTransferLineFunctions.getInternalTransferLineById,
  getInternalTransferLineAggById:
    internalTransferLineFunctions.getInternalTransferLineAggById,
  getInternalTransferLineListByQuery:
    internalTransferLineFunctions.getInternalTransferLineListByQuery,
  getInternalTransferLineStatsByQuery:
    internalTransferLineFunctions.getInternalTransferLineStatsByQuery,
  getInternalTransferLineByQuery:
    internalTransferLineFunctions.getInternalTransferLineByQuery,
  updateInternalTransferLineById:
    internalTransferLineFunctions.updateInternalTransferLineById,
  updateInternalTransferLineByIdList:
    internalTransferLineFunctions.updateInternalTransferLineByIdList,
  updateInternalTransferLineByQuery:
    internalTransferLineFunctions.updateInternalTransferLineByQuery,
  deleteInternalTransferLineById:
    internalTransferLineFunctions.deleteInternalTransferLineById,
  deleteInternalTransferLineByQuery:
    internalTransferLineFunctions.deleteInternalTransferLineByQuery,

  // InternalTransferLog Db Object
  dbGetInternaltransferlog:
    internalTransferLogFunctions.dbGetInternaltransferlog,
  dbCreateInternaltransferlog:
    internalTransferLogFunctions.dbCreateInternaltransferlog,
  dbUpdateInternaltransferlog:
    internalTransferLogFunctions.dbUpdateInternaltransferlog,
  dbDeleteInternaltransferlog:
    internalTransferLogFunctions.dbDeleteInternaltransferlog,
  dbListInternaltransferlogs:
    internalTransferLogFunctions.dbListInternaltransferlogs,
  createInternalTransferLog:
    internalTransferLogFunctions.createInternalTransferLog,
  getIdListOfInternalTransferLogByField:
    internalTransferLogFunctions.getIdListOfInternalTransferLogByField,
  getInternalTransferLogById:
    internalTransferLogFunctions.getInternalTransferLogById,
  getInternalTransferLogAggById:
    internalTransferLogFunctions.getInternalTransferLogAggById,
  getInternalTransferLogListByQuery:
    internalTransferLogFunctions.getInternalTransferLogListByQuery,
  getInternalTransferLogStatsByQuery:
    internalTransferLogFunctions.getInternalTransferLogStatsByQuery,
  getInternalTransferLogByQuery:
    internalTransferLogFunctions.getInternalTransferLogByQuery,
  updateInternalTransferLogById:
    internalTransferLogFunctions.updateInternalTransferLogById,
  updateInternalTransferLogByIdList:
    internalTransferLogFunctions.updateInternalTransferLogByIdList,
  updateInternalTransferLogByQuery:
    internalTransferLogFunctions.updateInternalTransferLogByQuery,
  deleteInternalTransferLogById:
    internalTransferLogFunctions.deleteInternalTransferLogById,
  deleteInternalTransferLogByQuery:
    internalTransferLogFunctions.deleteInternalTransferLogByQuery,

  // TransferFlowShareToken Db Object
  createTransferFlowShareToken:
    transferFlowShareTokenFunctions.createTransferFlowShareToken,
  getIdListOfTransferFlowShareTokenByField:
    transferFlowShareTokenFunctions.getIdListOfTransferFlowShareTokenByField,
  getTransferFlowShareTokenById:
    transferFlowShareTokenFunctions.getTransferFlowShareTokenById,
  getTransferFlowShareTokenAggById:
    transferFlowShareTokenFunctions.getTransferFlowShareTokenAggById,
  getTransferFlowShareTokenListByQuery:
    transferFlowShareTokenFunctions.getTransferFlowShareTokenListByQuery,
  getTransferFlowShareTokenStatsByQuery:
    transferFlowShareTokenFunctions.getTransferFlowShareTokenStatsByQuery,
  getTransferFlowShareTokenByQuery:
    transferFlowShareTokenFunctions.getTransferFlowShareTokenByQuery,
  updateTransferFlowShareTokenById:
    transferFlowShareTokenFunctions.updateTransferFlowShareTokenById,
  updateTransferFlowShareTokenByIdList:
    transferFlowShareTokenFunctions.updateTransferFlowShareTokenByIdList,
  updateTransferFlowShareTokenByQuery:
    transferFlowShareTokenFunctions.updateTransferFlowShareTokenByQuery,
  deleteTransferFlowShareTokenById:
    transferFlowShareTokenFunctions.deleteTransferFlowShareTokenById,
  deleteTransferFlowShareTokenByQuery:
    transferFlowShareTokenFunctions.deleteTransferFlowShareTokenByQuery,
};
