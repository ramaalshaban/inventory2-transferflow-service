const { HttpServerError } = require("common");

const { InternalTransferLog } = require("models");
const { Op } = require("sequelize");

const updateInternalTransferLogByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await InternalTransferLog.update(dataClause, options);
    const internalTransferLogIdList = rows.map((item) => item.id);
    return internalTransferLogIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingInternalTransferLogByIdList",
      err,
    );
  }
};

module.exports = updateInternalTransferLogByIdList;
