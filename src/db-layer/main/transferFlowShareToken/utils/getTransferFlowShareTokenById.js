const { HttpServerError } = require("common");

let { TransferFlowShareToken } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getTransferFlowShareTokenById = async (transferFlowShareTokenId) => {
  try {
    const transferFlowShareToken = Array.isArray(transferFlowShareTokenId)
      ? await TransferFlowShareToken.findAll({
          where: {
            id: { [Op.in]: transferFlowShareTokenId },
            isActive: true,
          },
        })
      : await TransferFlowShareToken.findOne({
          where: {
            id: transferFlowShareTokenId,
            isActive: true,
          },
        });

    if (!transferFlowShareToken) {
      return null;
    }
    return Array.isArray(transferFlowShareTokenId)
      ? transferFlowShareToken.map((item) => item.getData())
      : transferFlowShareToken.getData();
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTransferFlowShareTokenById",
      err,
    );
  }
};

module.exports = getTransferFlowShareTokenById;
