const { CreateInternalTransferLogManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class CreateInternalTransferLogMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("createInternalTransferLog", "createinternaltransferlog", params);
    this.dataName = "internalTransferLog";
    this.crudType = "create";
  }

  createApiManager() {
    return new CreateInternalTransferLogManager(this.request, "mcp");
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
      internalTransferId: z
        .string()
        .uuid()
        .describe("Pointer to the overall transfer this log event refers to."),

      transferLineId: z
        .string()
        .uuid()
        .optional()
        .describe(
          "Line-level event, pointer to which line/book was involved, nullable.",
        ),

      eventType: z
        .enum([])
        .describe(
          "Type of event (created, statusChanged, lineAdded, lineUpdated, lineRemoved, canceled, completed, etc.).",
        ),

      oldStatus: z
        .enum([])
        .optional()
        .describe(
          "Previous status for status change/cancel events (nullable/optional for most other events).",
        ),

      newStatus: z
        .enum([])
        .optional()
        .describe(
          "New status for status change/cancel events (nullable for most other events, mirrors internalTransfer.status).",
        ),

      note: z
        .string()
        .optional()
        .describe("Description, comment, or note for this event/change."),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "createInternalTransferLog",
    description: "Record a transfer-related audit event.",
    parameters: CreateInternalTransferLogMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const createInternalTransferLogMcpController =
        new CreateInternalTransferLogMcpController(mcpParams);
      try {
        const result =
          await createInternalTransferLogMcpController.processRequest();
        //return CreateInternalTransferLogMcpController.getOutputSchema().parse(result);
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
