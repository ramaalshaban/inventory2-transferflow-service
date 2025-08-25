const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");
const { Op } = require("sequelize");

const getInternalTransferLineAggById = async (internalTransferLineId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const internalTransferLine = Array.isArray(internalTransferLineId)
      ? await InternalTransferLine.findAll({
          where: {
            id: { [Op.in]: internalTransferLineId },
            isActive: true,
          },
          include: includes,
        })
      : await InternalTransferLine.findOne({
          where: {
            id: internalTransferLineId,
            isActive: true,
          },
          include: includes,
        });

    if (!internalTransferLine) {
      return null;
    }

    const internalTransferLineData =
      Array.isArray(internalTransferLineId) && internalTransferLineId.length > 0
        ? internalTransferLine.map((item) => item.getData())
        : internalTransferLine.getData();
    await InternalTransferLine.getCqrsJoins(internalTransferLineData);
    return internalTransferLineData;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLineAggById",
      err,
    );
  }
};

module.exports = getInternalTransferLineAggById;
