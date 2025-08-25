const InternalTransferLineManager = require("./InternalTransferLineManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateInternaltransferline } = require("dbLayer");

class CreateInternalTransferLineManager extends InternalTransferLineManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createInternalTransferLine",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransferLine";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferId = this.internalTransferId;
    jsonObj.bookId = this.bookId;
    jsonObj.quantity = this.quantity;
    jsonObj.note = this.note;
  }

  readRestParameters(request) {
    this.internalTransferId = request.body?.internalTransferId;
    this.bookId = request.body?.bookId;
    this.quantity = request.body?.quantity;
    this.note = request.body?.note;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferId = request.mcpParams.internalTransferId;
    this.bookId = request.mcpParams.bookId;
    this.quantity = request.mcpParams.quantity;
    this.note = request.mcpParams.note;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.internalTransferId == null) {
      throw new BadRequestError("errMsg_internalTransferIdisRequired");
    }

    if (this.bookId == null) {
      throw new BadRequestError("errMsg_bookIdisRequired");
    }

    if (this.quantity == null) {
      throw new BadRequestError("errMsg_quantityisRequired");
    }

    // ID
    if (
      this.internalTransferId &&
      !isValidObjectId(this.internalTransferId) &&
      !isValidUUID(this.internalTransferId)
    ) {
      throw new BadRequestError("errMsg_internalTransferIdisNotAValidID");
    }

    // ID
    if (
      this.bookId &&
      !isValidObjectId(this.bookId) &&
      !isValidUUID(this.bookId)
    ) {
      throw new BadRequestError("errMsg_bookIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransferLine?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateInternaltransferline function to create the internaltransferline and return the result to the controller
    const internaltransferline = await dbCreateInternaltransferline(this);

    return internaltransferline;
  }

  async getDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.internalTransferLineId = this.id;
    if (!this.internalTransferLineId)
      this.internalTransferLineId = newUUID(false);

    const dataClause = {
      id: this.internalTransferLineId,
      internalTransferId: this.internalTransferId,
      bookId: this.bookId,
      quantity: this.quantity,
      note: this.note,
    };

    return dataClause;
  }
}

module.exports = CreateInternalTransferLineManager;
