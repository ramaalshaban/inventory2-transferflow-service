const InternalTransferManager = require("./InternalTransferManager");
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
const { dbUpdateInternaltransfer } = require("dbLayer");

class UpdateInternalTransferManager extends InternalTransferManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateInternalTransfer",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: false,
      hasShareToken: false,
    });

    this.dataName = "internalTransfer";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.internalTransferId = this.internalTransferId;
    jsonObj.sourceBranchId = this.sourceBranchId;
    jsonObj.sourceSectionId = this.sourceSectionId;
    jsonObj.destinationBranchId = this.destinationBranchId;
    jsonObj.destinationSectionId = this.destinationSectionId;
    jsonObj.status = this.status;
    jsonObj.reason = this.reason;
    jsonObj.note = this.note;
    jsonObj.transferDate = this.transferDate;
  }

  readRestParameters(request) {
    this.internalTransferId = request.params?.internalTransferId;
    this.sourceBranchId = request.body?.sourceBranchId;
    this.sourceSectionId = request.body?.sourceSectionId;
    this.destinationBranchId = request.body?.destinationBranchId;
    this.destinationSectionId = request.body?.destinationSectionId;
    this.status = request.body?.status;
    this.reason = request.body?.reason;
    this.note = request.body?.note;
    this.transferDate = request.body?.transferDate;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.internalTransferId = request.mcpParams.internalTransferId;
    this.sourceBranchId = request.mcpParams.sourceBranchId;
    this.sourceSectionId = request.mcpParams.sourceSectionId;
    this.destinationBranchId = request.mcpParams.destinationBranchId;
    this.destinationSectionId = request.mcpParams.destinationSectionId;
    this.status = request.mcpParams.status;
    this.reason = request.mcpParams.reason;
    this.note = request.mcpParams.note;
    this.transferDate = request.mcpParams.transferDate;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getInternalTransferById } = require("dbLayer");
    this.internalTransfer = await getInternalTransferById(
      this.internalTransferId,
    );
    if (!this.internalTransfer) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.internalTransferId == null) {
      throw new BadRequestError("errMsg_internalTransferIdisRequired");
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
      this.sourceBranchId &&
      !isValidObjectId(this.sourceBranchId) &&
      !isValidUUID(this.sourceBranchId)
    ) {
      throw new BadRequestError("errMsg_sourceBranchIdisNotAValidID");
    }

    // ID
    if (
      this.sourceSectionId &&
      !isValidObjectId(this.sourceSectionId) &&
      !isValidUUID(this.sourceSectionId)
    ) {
      throw new BadRequestError("errMsg_sourceSectionIdisNotAValidID");
    }

    // ID
    if (
      this.destinationBranchId &&
      !isValidObjectId(this.destinationBranchId) &&
      !isValidUUID(this.destinationBranchId)
    ) {
      throw new BadRequestError("errMsg_destinationBranchIdisNotAValidID");
    }

    // ID
    if (
      this.destinationSectionId &&
      !isValidObjectId(this.destinationSectionId) &&
      !isValidUUID(this.destinationSectionId)
    ) {
      throw new BadRequestError("errMsg_destinationSectionIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.internalTransfer?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateInternaltransfer function to update the internaltransfer and return the result to the controller
    const internaltransfer = await dbUpdateInternaltransfer(this);

    return internaltransfer;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.internalTransferId }, { isActive: true }] };

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
      sourceBranchId: this.sourceBranchId,
      sourceSectionId: this.sourceSectionId,
      destinationBranchId: this.destinationBranchId,
      destinationSectionId: this.destinationSectionId,
      status: this.status,
      reason: this.reason,
      note: this.note,
      transferDate: this.transferDate,
    };

    return dataClause;
  }
}

module.exports = UpdateInternalTransferManager;
