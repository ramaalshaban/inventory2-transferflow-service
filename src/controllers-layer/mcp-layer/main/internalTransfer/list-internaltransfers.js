const { ListInternalTransfersManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class ListInternalTransfersMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("listInternalTransfers", "listinternaltransfers", params);
    this.dataName = "internalTransfers";
    this.crudType = "getList";
  }

  createApiManager() {
    return new ListInternalTransfersManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        internalTransfers: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            sourceBranchId: z
              .string()
              .uuid()
              .describe("Originating branch for the books being transferred."),
            sourceSectionId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "Originating section of the branch, if applicable. Nullable.",
              ),
            destinationBranchId: z
              .string()
              .uuid()
              .describe("Destination branch for the transfer."),
            destinationSectionId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "Destination section in branch; nullable if not by section.",
              ),
            status: z
              .enum(["initiated", "inTransit", "completed", "canceled"])
              .describe(
                "Current transfer status (initiated, in transit, completed, canceled).",
              ),
            reason: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Reason for this transfer (e.g., stock balancing, request). Optional.",
              ),
            note: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Optional additional notes for this transfer event/request.",
              ),
            transferDate: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Date/time when transfer was initiated or is to take effect. Defaults to creation time.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Represents a transfer request/event moving one or more books between a source and destination branch/section. Stores status, audit trail, and basic transfer metadata.",
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {};
  }
}

module.exports = (headers) => {
  return {
    name: "listInternalTransfers",
    description:
      "List all transfer requests, filterable by properties (branch, status, date, etc.) for trace/audit.",
    parameters: ListInternalTransfersMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const listInternalTransfersMcpController =
        new ListInternalTransfersMcpController(mcpParams);
      try {
        const result =
          await listInternalTransfersMcpController.processRequest();
        //return ListInternalTransfersMcpController.getOutputSchema().parse(result);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
