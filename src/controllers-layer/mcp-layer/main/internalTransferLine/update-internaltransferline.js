const { UpdateInternalTransferLineManager } = require("managers");
const { z } = require("zod");

const TransferFlowMcpController = require("../../TransferFlowServiceMcpController");

class UpdateInternalTransferLineMcpController extends TransferFlowMcpController {
  constructor(params) {
    super("updateInternalTransferLine", "updateinternaltransferline", params);
    this.dataName = "internalTransferLine";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateInternalTransferLineManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        internalTransferLine: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            internalTransferId: z
              .string()
              .uuid()
              .describe("Parent transfer event this line belongs to."),
            bookId: z.string().uuid().describe("Book to be transferred."),
            quantity: z
              .number()
              .int()
              .describe(
                "Number of copies of the book to transfer (must be positive).",
              ),
            note: z
              .string()
              .optional()
              .nullable()
              .describe(
                "Optional note per transfer line (e.g., batch, special instruction).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A line item in an internal transfer, representing a specific book being moved and its quantity, linked to a parent transfer event.",
          ),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      internalTransferLineId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be updated",
        ),

      internalTransferId: z
        .string()
        .uuid()
        .optional()
        .describe("Parent transfer event this line belongs to."),

      bookId: z.string().uuid().optional().describe("Book to be transferred."),

      quantity: z
        .number()
        .int()
        .optional()
        .describe(
          "Number of copies of the book to transfer (must be positive).",
        ),

      note: z
        .string()
        .optional()
        .describe(
          "Optional note per transfer line (e.g., batch, special instruction).",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateInternalTransferLine",
    description:
      "Update attributes (quantity, note) for a transfer line if modifiable.",
    parameters: UpdateInternalTransferLineMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const updateInternalTransferLineMcpController =
        new UpdateInternalTransferLineMcpController(mcpParams);
      try {
        const result =
          await updateInternalTransferLineMcpController.processRequest();
        //return UpdateInternalTransferLineMcpController.getOutputSchema().parse(result);
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
