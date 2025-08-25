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
const { dbUpdateInternaltransferline } = require("dbLayer");

class UpdateInternalTransferLineManager extends InternalTransferLineManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateInternalTransferLine",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransferLine";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferLineId = this.internalTransferLineId;
    jsonObj.internalTransferId = this.internalTransferId;
    jsonObj.bookId = this.bookId;
    jsonObj.quantity = this.quantity;
    jsonObj.note = this.note;
  }

  readRestParameters(request) {
    this.internalTransferLineId = request.params?.internalTransferLineId;
    this.internalTransferId = request.body?.internalTransferId;
    this.bookId = request.body?.bookId;
    this.quantity = request.body?.quantity;
    this.note = request.body?.note;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferLineId = request.mcpParams.internalTransferLineId;
    this.internalTransferId = request.mcpParams.internalTransferId;
    this.bookId = request.mcpParams.bookId;
    this.quantity = request.mcpParams.quantity;
    this.note = request.mcpParams.note;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getInternalTransferLineById } = require("dbLayer");
    this.internalTransferLine = await getInternalTransferLineById(
      this.internalTransferLineId,
    );
    if (!this.internalTransferLine) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.internalTransferLineId == null) {
      throw new BadRequestError("errMsg_internalTransferLineIdisRequired");
    }

    // ID
    if (
      this.internalTransferLineId &&
      !isValidObjectId(this.internalTransferLineId) &&
      !isValidUUID(this.internalTransferLineId)
    ) {
      throw new BadRequestError("errMsg_internalTransferLineIdisNotAValidID");
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
    // make an awaited call to the dbUpdateInternaltransferline function to update the internaltransferline and return the result to the controller
    const internaltransferline = await dbUpdateInternaltransferline(this);

    return internaltransferline;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.internalTransferLineId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      internalTransferId: this.internalTransferId,
      bookId: this.bookId,
      quantity: this.quantity,
      note: this.note,
    };

    return dataClause;
  }
}

module.exports = UpdateInternalTransferLineManager;
