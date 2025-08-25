const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { InternalTransferLine } = require("models");
const { Op } = require("sequelize");

const getIdListOfInternalTransferLineByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    let isValidField = false;

    const internalTransferLineProperties = [
      "id",
      "internalTransferId",
      "bookId",
      "quantity",
      "note",
    ];

    isValidField = internalTransferLineProperties.includes(fieldName);

    if (!isValidField) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    const expectedType = typeof InternalTransferLine[fieldName];

    if (typeof fieldValue !== expectedType) {
      throw new BadRequestError(
        `Invalid field value type for ${fieldName}. Expected ${expectedType}.`,
      );
    }

    const options = {
      where: isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true },
      attributes: ["id"],
    };

    let internalTransferLineIdList =
      await InternalTransferLine.findAll(options);

    if (
      !internalTransferLineIdList ||
      internalTransferLineIdList.length === 0
    ) {
      throw new NotFoundError(
        `InternalTransferLine with the specified criteria not found`,
      );
    }

    internalTransferLineIdList = internalTransferLineIdList.map(
      (item) => item.id,
    );
    return internalTransferLineIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLineIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfInternalTransferLineByField;
