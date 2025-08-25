const { HttpServerError, BadRequestError } = require("common");

const { InternalTransferLine } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getInternalTransferLineListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const internalTransferLine = await InternalTransferLine.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!internalTransferLine || internalTransferLine.length === 0) return [];

    //      if (!internalTransferLine || internalTransferLine.length === 0) {
    //      throw new NotFoundError(
    //      `InternalTransferLine with the specified criteria not found`
    //  );
    //}

    return internalTransferLine.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLineListByQuery",
      err,
    );
  }
};

module.exports = getInternalTransferLineListByQuery;
