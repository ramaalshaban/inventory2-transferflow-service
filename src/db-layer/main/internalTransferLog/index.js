const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetInternaltransferlog: require("./dbGetInternaltransferlog"),
  dbCreateInternaltransferlog: require("./dbCreateInternaltransferlog"),
  dbUpdateInternaltransferlog: require("./dbUpdateInternaltransferlog"),
  dbDeleteInternaltransferlog: require("./dbDeleteInternaltransferlog"),
  dbListInternaltransferlogs: require("./dbListInternaltransferlogs"),
  createInternalTransferLog: utils.createInternalTransferLog,
  getIdListOfInternalTransferLogByField:
    utils.getIdListOfInternalTransferLogByField,
  getInternalTransferLogById: utils.getInternalTransferLogById,
  getInternalTransferLogAggById: utils.getInternalTransferLogAggById,
  getInternalTransferLogListByQuery: utils.getInternalTransferLogListByQuery,
  getInternalTransferLogStatsByQuery: utils.getInternalTransferLogStatsByQuery,
  getInternalTransferLogByQuery: utils.getInternalTransferLogByQuery,
  updateInternalTransferLogById: utils.updateInternalTransferLogById,
  updateInternalTransferLogByIdList: utils.updateInternalTransferLogByIdList,
  updateInternalTransferLogByQuery: utils.updateInternalTransferLogByQuery,
  deleteInternalTransferLogById: utils.deleteInternalTransferLogById,
  deleteInternalTransferLogByQuery: utils.deleteInternalTransferLogByQuery,
};
