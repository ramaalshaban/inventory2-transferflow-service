const { HttpServerError } = require("common");

const { InternalTransferLine } = require("models");
const { Op } = require("sequelize");

const updateInternalTransferLineByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await InternalTransferLine.update(dataClause, options);
    const internalTransferLineIdList = rows.map((item) => item.id);
    return internalTransferLineIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingInternalTransferLineByIdList",
      err,
    );
  }
};

module.exports = updateInternalTransferLineByIdList;
