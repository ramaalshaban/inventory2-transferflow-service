const { GetInternalTransferLogManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class GetInternalTransferLogMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("getInternalTransferLog", "getinternaltransferlog", params);
    this.dataName = "internalTransferLog";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetInternalTransferLogManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        internalTransferLog: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            internalTransferId: z
              .string()
              .uuid()
              .describe(
                "Pointer to the overall transfer this log event refers to.",
              ),
            transferLineId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "Line-level event, pointer to which line/book was involved, nullable.",
              ),
            eventType: z
              .enum([
                "created",
                "statusChanged",
                "lineAdded",
                "lineUpdated",
                "lineRemoved",
                "canceled",
                "completed",
              ])
              .describe(
                "Type of event (created, statusChanged, lineAdded, lineUpdated, lineRemoved, canceled, completed, etc.).",
              ),
            oldStatus: z
              .enum(["initiated", "inTransit", "completed", "canceled"])
              .optional()
              .nullable()
              .describe(
                "Previous status for status change/cancel events (nullable/optional for most other events).",
              ),
            newStatus: z
              .enum(["initiated", "inTransit", "completed", "canceled"])
              .optional()
              .nullable()
              .describe(
                "New status for status change/cancel events (nullable for most other events, mirrors internalTransfer.status).",
              ),
            note: z
              .string()
              .optional()
              .nullable()
              .describe("Description, comment, or note for this event/change."),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Audit log for all significant transfer-related events (status changes, line changes, cancellations). Records past state for traceability.",
          ),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      internalTransferLogId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that is queried",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getInternalTransferLog",
    description: "Get audit log entry by id.",
    parameters: GetInternalTransferLogMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const getInternalTransferLogMcpController =
        new GetInternalTransferLogMcpController(mcpParams);
      try {
        const result =
          await getInternalTransferLogMcpController.processRequest();
        //return GetInternalTransferLogMcpController.getOutputSchema().parse(result);
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
