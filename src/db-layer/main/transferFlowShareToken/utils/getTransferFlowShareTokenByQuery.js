const { HttpServerError, BadRequestError } = require("common");

const { TransferFlowShareToken } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getTransferFlowShareTokenByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const transferFlowShareToken = await TransferFlowShareToken.findOne({
      where: { ...query, isActive: true },
    });

    if (!transferFlowShareToken) return null;
    return transferFlowShareToken.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTransferFlowShareTokenByQuery",
      err,
    );
  }
};

module.exports = getTransferFlowShareTokenByQuery;
