const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetInternaltransferline: require("./dbGetInternaltransferline"),
  dbCreateInternaltransferline: require("./dbCreateInternaltransferline"),
  dbUpdateInternaltransferline: require("./dbUpdateInternaltransferline"),
  dbDeleteInternaltransferline: require("./dbDeleteInternaltransferline"),
  dbListInternaltransferlines: require("./dbListInternaltransferlines"),
  createInternalTransferLine: utils.createInternalTransferLine,
  getIdListOfInternalTransferLineByField:
    utils.getIdListOfInternalTransferLineByField,
  getInternalTransferLineById: utils.getInternalTransferLineById,
  getInternalTransferLineAggById: utils.getInternalTransferLineAggById,
  getInternalTransferLineListByQuery: utils.getInternalTransferLineListByQuery,
  getInternalTransferLineStatsByQuery:
    utils.getInternalTransferLineStatsByQuery,
  getInternalTransferLineByQuery: utils.getInternalTransferLineByQuery,
  updateInternalTransferLineById: utils.updateInternalTransferLineById,
  updateInternalTransferLineByIdList: utils.updateInternalTransferLineByIdList,
  updateInternalTransferLineByQuery: utils.updateInternalTransferLineByQuery,
  deleteInternalTransferLineById: utils.deleteInternalTransferLineById,
  deleteInternalTransferLineByQuery: utils.deleteInternalTransferLineByQuery,
};
