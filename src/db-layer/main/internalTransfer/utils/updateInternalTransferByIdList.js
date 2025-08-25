const { HttpServerError } = require("common");

const { InternalTransfer } = require("models");
const { Op } = require("sequelize");

const updateInternalTransferByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await InternalTransfer.update(dataClause, options);
    const internalTransferIdList = rows.map((item) => item.id);
    return internalTransferIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingInternalTransferByIdList",
      err,
    );
  }
};

module.exports = updateInternalTransferByIdList;
