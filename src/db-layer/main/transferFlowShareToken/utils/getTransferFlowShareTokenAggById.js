const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  InternalTransfer,
  InternalTransferLine,
  InternalTransferLog,
  TransferFlowShareToken,
} = require("models");
const { Op } = require("sequelize");

const getTransferFlowShareTokenAggById = async (transferFlowShareTokenId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const transferFlowShareToken = Array.isArray(transferFlowShareTokenId)
      ? await TransferFlowShareToken.findAll({
          where: {
            id: { [Op.in]: transferFlowShareTokenId },
            isActive: true,
          },
          include: includes,
        })
      : await TransferFlowShareToken.findOne({
          where: {
            id: transferFlowShareTokenId,
            isActive: true,
          },
          include: includes,
        });

    if (!transferFlowShareToken) {
      return null;
    }

    const transferFlowShareTokenData =
      Array.isArray(transferFlowShareTokenId) &&
      transferFlowShareTokenId.length > 0
        ? transferFlowShareToken.map((item) => item.getData())
        : transferFlowShareToken.getData();
    await TransferFlowShareToken.getCqrsJoins(transferFlowShareTokenData);
    return transferFlowShareTokenData;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTransferFlowShareTokenAggById",
      err,
    );
  }
};

module.exports = getTransferFlowShareTokenAggById;
