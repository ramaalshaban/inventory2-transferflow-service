const { HttpServerError, BadRequestError } = require("common");

const { InternalTransferLine } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getInternalTransferLineByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const internalTransferLine = await InternalTransferLine.findOne({
      where: { ...query, isActive: true },
    });

    if (!internalTransferLine) return null;
    return internalTransferLine.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLineByQuery",
      err,
    );
  }
};

module.exports = getInternalTransferLineByQuery;
