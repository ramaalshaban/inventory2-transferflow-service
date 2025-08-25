const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { InternalTransferLog } = require("models");
const { Op } = require("sequelize");

const getIdListOfInternalTransferLogByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    let isValidField = false;

    const internalTransferLogProperties = [
      "id",
      "internalTransferId",
      "transferLineId",
      "eventType",
      "oldStatus",
      "newStatus",
      "note",
    ];

    isValidField = internalTransferLogProperties.includes(fieldName);

    if (!isValidField) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    const expectedType = typeof InternalTransferLog[fieldName];

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

    let internalTransferLogIdList = await InternalTransferLog.findAll(options);

    if (!internalTransferLogIdList || internalTransferLogIdList.length === 0) {
      throw new NotFoundError(
        `InternalTransferLog with the specified criteria not found`,
      );
    }

    internalTransferLogIdList = internalTransferLogIdList.map(
      (item) => item.id,
    );
    return internalTransferLogIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingInternalTransferLogIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfInternalTransferLogByField;
