const { HttpServerError, BadRequestError } = require("common");

const { TransferFlowShareToken } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getTransferFlowShareTokenListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const transferFlowShareToken = await TransferFlowShareToken.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!transferFlowShareToken || transferFlowShareToken.length === 0)
      return [];

    //      if (!transferFlowShareToken || transferFlowShareToken.length === 0) {
    //      throw new NotFoundError(
    //      `TransferFlowShareToken with the specified criteria not found`
    //  );
    //}

    return transferFlowShareToken.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingTransferFlowShareTokenListByQuery",
      err,
    );
  }
};

module.exports = getTransferFlowShareTokenListByQuery;
