const mainFunctions = require("./main");

module.exports = {
  // main Database
  // InternalTransfer Db Object
  dbGetInternaltransfer: mainFunctions.dbGetInternaltransfer,
  dbGetInternaltransferbystatus: mainFunctions.dbGetInternaltransferbystatus,
  dbCreateInternaltransfer: mainFunctions.dbCreateInternaltransfer,
  dbUpdateInternaltransfer: mainFunctions.dbUpdateInternaltransfer,
  dbDeleteInternaltransfer: mainFunctions.dbDeleteInternaltransfer,
  dbListInternaltransfers: mainFunctions.dbListInternaltransfers,
  createInternalTransfer: mainFunctions.createInternalTransfer,
  getIdListOfInternalTransferByField:
    mainFunctions.getIdListOfInternalTransferByField,
  getInternalTransferById: mainFunctions.getInternalTransferById,
  getInternalTransferAggById: mainFunctions.getInternalTransferAggById,
  getInternalTransferListByQuery: mainFunctions.getInternalTransferListByQuery,
  getInternalTransferStatsByQuery:
    mainFunctions.getInternalTransferStatsByQuery,
  getInternalTransferByQuery: mainFunctions.getInternalTransferByQuery,
  updateInternalTransferById: mainFunctions.updateInternalTransferById,
  updateInternalTransferByIdList: mainFunctions.updateInternalTransferByIdList,
  updateInternalTransferByQuery: mainFunctions.updateInternalTransferByQuery,
  deleteInternalTransferById: mainFunctions.deleteInternalTransferById,
  deleteInternalTransferByQuery: mainFunctions.deleteInternalTransferByQuery,

  // InternalTransferLine Db Object
  dbGetInternaltransferline: mainFunctions.dbGetInternaltransferline,
  dbCreateInternaltransferline: mainFunctions.dbCreateInternaltransferline,
  dbUpdateInternaltransferline: mainFunctions.dbUpdateInternaltransferline,
  dbDeleteInternaltransferline: mainFunctions.dbDeleteInternaltransferline,
  dbListInternaltransferlines: mainFunctions.dbListInternaltransferlines,
  createInternalTransferLine: mainFunctions.createInternalTransferLine,
  getIdListOfInternalTransferLineByField:
    mainFunctions.getIdListOfInternalTransferLineByField,
  getInternalTransferLineById: mainFunctions.getInternalTransferLineById,
  getInternalTransferLineAggById: mainFunctions.getInternalTransferLineAggById,
  getInternalTransferLineListByQuery:
    mainFunctions.getInternalTransferLineListByQuery,
  getInternalTransferLineStatsByQuery:
    mainFunctions.getInternalTransferLineStatsByQuery,
  getInternalTransferLineByQuery: mainFunctions.getInternalTransferLineByQuery,
  updateInternalTransferLineById: mainFunctions.updateInternalTransferLineById,
  updateInternalTransferLineByIdList:
    mainFunctions.updateInternalTransferLineByIdList,
  updateInternalTransferLineByQuery:
    mainFunctions.updateInternalTransferLineByQuery,
  deleteInternalTransferLineById: mainFunctions.deleteInternalTransferLineById,
  deleteInternalTransferLineByQuery:
    mainFunctions.deleteInternalTransferLineByQuery,

  // InternalTransferLog Db Object
  dbGetInternaltransferlog: mainFunctions.dbGetInternaltransferlog,
  dbCreateInternaltransferlog: mainFunctions.dbCreateInternaltransferlog,
  dbUpdateInternaltransferlog: mainFunctions.dbUpdateInternaltransferlog,
  dbDeleteInternaltransferlog: mainFunctions.dbDeleteInternaltransferlog,
  dbListInternaltransferlogs: mainFunctions.dbListInternaltransferlogs,
  createInternalTransferLog: mainFunctions.createInternalTransferLog,
  getIdListOfInternalTransferLogByField:
    mainFunctions.getIdListOfInternalTransferLogByField,
  getInternalTransferLogById: mainFunctions.getInternalTransferLogById,
  getInternalTransferLogAggById: mainFunctions.getInternalTransferLogAggById,
  getInternalTransferLogListByQuery:
    mainFunctions.getInternalTransferLogListByQuery,
  getInternalTransferLogStatsByQuery:
    mainFunctions.getInternalTransferLogStatsByQuery,
  getInternalTransferLogByQuery: mainFunctions.getInternalTransferLogByQuery,
  updateInternalTransferLogById: mainFunctions.updateInternalTransferLogById,
  updateInternalTransferLogByIdList:
    mainFunctions.updateInternalTransferLogByIdList,
  updateInternalTransferLogByQuery:
    mainFunctions.updateInternalTransferLogByQuery,
  deleteInternalTransferLogById: mainFunctions.deleteInternalTransferLogById,
  deleteInternalTransferLogByQuery:
    mainFunctions.deleteInternalTransferLogByQuery,

  // TransferFlowShareToken Db Object
  createTransferFlowShareToken: mainFunctions.createTransferFlowShareToken,
  getIdListOfTransferFlowShareTokenByField:
    mainFunctions.getIdListOfTransferFlowShareTokenByField,
  getTransferFlowShareTokenById: mainFunctions.getTransferFlowShareTokenById,
  getTransferFlowShareTokenAggById:
    mainFunctions.getTransferFlowShareTokenAggById,
  getTransferFlowShareTokenListByQuery:
    mainFunctions.getTransferFlowShareTokenListByQuery,
  getTransferFlowShareTokenStatsByQuery:
    mainFunctions.getTransferFlowShareTokenStatsByQuery,
  getTransferFlowShareTokenByQuery:
    mainFunctions.getTransferFlowShareTokenByQuery,
  updateTransferFlowShareTokenById:
    mainFunctions.updateTransferFlowShareTokenById,
  updateTransferFlowShareTokenByIdList:
    mainFunctions.updateTransferFlowShareTokenByIdList,
  updateTransferFlowShareTokenByQuery:
    mainFunctions.updateTransferFlowShareTokenByQuery,
  deleteTransferFlowShareTokenById:
    mainFunctions.deleteTransferFlowShareTokenById,
  deleteTransferFlowShareTokenByQuery:
    mainFunctions.deleteTransferFlowShareTokenByQuery,
};
