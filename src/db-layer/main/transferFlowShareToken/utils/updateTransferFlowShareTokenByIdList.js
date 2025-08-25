const { HttpServerError } = require("common");

const { TransferFlowShareToken } = require("models");
const { Op } = require("sequelize");

const updateTransferFlowShareTokenByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await TransferFlowShareToken.update(
      dataClause,
      options,
    );
    const transferFlowShareTokenIdList = rows.map((item) => item.id);
    return transferFlowShareTokenIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingTransferFlowShareTokenByIdList",
      err,
    );
  }
};

module.exports = updateTransferFlowShareTokenByIdList;
