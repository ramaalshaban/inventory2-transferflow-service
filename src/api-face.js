const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const authUrl = (process.env.SERVICE_URL ?? "mindbricks.com").replace(
    process.env.SERVICE_SHORT_NAME,
    "auth",
  );

  const config = {
    name: "inventory - transferFlow",
    brand: {
      name: "inventory",
      image: "https://mindbricks.com/favicon.ico",
      moduleName: "transferFlow",
      version: process.env.SERVICE_VERSION || "1.0.0",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "InternalTransfer",
        description:
          "Represents a transfer request/event moving one or more books between a source and destination branch/section. Stores status, audit trail, and basic transfer metadata.",
        reference: {
          tableName: "internalTransfer",
          properties: [
            {
              name: "sourceBranchId",
              type: "ID",
            },

            {
              name: "sourceSectionId",
              type: "ID",
            },

            {
              name: "destinationBranchId",
              type: "ID",
            },

            {
              name: "destinationSectionId",
              type: "ID",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "reason",
              type: "String",
            },

            {
              name: "note",
              type: "Text",
            },

            {
              name: "transferDate",
              type: "Date",
            },
          ],
        },
        endpoints: [
          {
            isAuth: false,
            method: "GET",
            url: "/internaltransfers/{internalTransferId}",
            title: "getInternalTransfer",
            query: [],

            parameters: [
              {
                key: "internalTransferId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "GET",
            url: "/internaltransferbystatus/{internalTransferId}",
            title: "getInternalTransferByStatus",
            query: [
              {
                key: "status",
                value: "",
                description:
                  "Current transfer status (initiated, in transit, completed, canceled).. The parameter is used to query data.",
                active: true,
              },
            ],

            parameters: [
              {
                key: "internalTransferId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "POST",
            url: "/internaltransfers",
            title: "createInternalTransfer",
            query: [],

            body: {
              type: "json",
              content: {
                sourceBranchId: "ID",
                sourceSectionId: "ID",
                destinationBranchId: "ID",
                destinationSectionId: "ID",
                status: "Enum",
                reason: "String",
                note: "Text",
                transferDate: "Date",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: false,
            method: "PATCH",
            url: "/internaltransfers/{internalTransferId}",
            title: "updateInternalTransfer",
            query: [],

            body: {
              type: "json",
              content: {
                sourceBranchId: "ID",
                sourceSectionId: "ID",
                destinationBranchId: "ID",
                destinationSectionId: "ID",
                status: "Enum",
                reason: "String",
                note: "Text",
                transferDate: "Date",
              },
            },

            parameters: [
              {
                key: "internalTransferId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "DELETE",
            url: "/internaltransfers/{internalTransferId}",
            title: "deleteInternalTransfer",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "internalTransferId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "GET",
            url: "/internaltransfers",
            title: "listInternalTransfers",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "InternalTransferLine",
        description:
          "A line item in an internal transfer, representing a specific book being moved and its quantity, linked to a parent transfer event.",
        reference: {
          tableName: "internalTransferLine",
          properties: [
            {
              name: "internalTransferId",
              type: "ID",
            },

            {
              name: "bookId",
              type: "ID",
            },

            {
              name: "quantity",
              type: "Integer",
            },

            {
              name: "note",
              type: "Text",
            },
          ],
        },
        endpoints: [
          {
            isAuth: false,
            method: "GET",
            url: "/internaltransferlines/{internalTransferLineId}",
            title: "getInternalTransferLine",
            query: [],

            parameters: [
              {
                key: "internalTransferLineId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "POST",
            url: "/internaltransferlines",
            title: "createInternalTransferLine",
            query: [],

            body: {
              type: "json",
              content: {
                internalTransferId: "ID",
                bookId: "ID",
                quantity: "Integer",
                note: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: false,
            method: "PATCH",
            url: "/internaltransferlines/{internalTransferLineId}",
            title: "updateInternalTransferLine",
            query: [],

            body: {
              type: "json",
              content: {
                internalTransferId: "ID",
                bookId: "ID",
                quantity: "Integer",
                note: "Text",
              },
            },

            parameters: [
              {
                key: "internalTransferLineId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "DELETE",
            url: "/internaltransferlines/{internalTransferLineId}",
            title: "deleteInternalTransferLine",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "internalTransferLineId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "GET",
            url: "/internaltransferlines",
            title: "listInternalTransferLines",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "InternalTransferLog",
        description:
          "Audit log for all significant transfer-related events (status changes, line changes, cancellations). Records past state for traceability.",
        reference: {
          tableName: "internalTransferLog",
          properties: [
            {
              name: "internalTransferId",
              type: "ID",
            },

            {
              name: "transferLineId",
              type: "ID",
            },

            {
              name: "eventType",
              type: "Enum",
            },

            {
              name: "oldStatus",
              type: "Enum",
            },

            {
              name: "newStatus",
              type: "Enum",
            },

            {
              name: "note",
              type: "Text",
            },
          ],
        },
        endpoints: [
          {
            isAuth: false,
            method: "GET",
            url: "/internaltransferlogs/{internalTransferLogId}",
            title: "getInternalTransferLog",
            query: [],

            parameters: [
              {
                key: "internalTransferLogId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "POST",
            url: "/internaltransferlogs",
            title: "createInternalTransferLog",
            query: [],

            body: {
              type: "json",
              content: {
                internalTransferId: "ID",
                transferLineId: "ID",
                eventType: "Enum",
                oldStatus: "Enum",
                newStatus: "Enum",
                note: "Text",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: false,
            method: "PATCH",
            url: "/internaltransferlogs/{internalTransferLogId}",
            title: "updateInternalTransferLog",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "internalTransferLogId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "DELETE",
            url: "/internaltransferlogs/{internalTransferLogId}",
            title: "deleteInternalTransferLog",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "internalTransferLogId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "GET",
            url: "/internaltransferlogs",
            title: "listInternalTransferLogs",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "TransferFlowShareToken",
        description:
          "A data object that stores the share tokens for tokenized access to shared objects.",
        reference: {
          tableName: "transferFlowShareToken",
          properties: [
            {
              name: "configName",
              type: "String",
            },

            {
              name: "objectName",
              type: "String",
            },

            {
              name: "objectId",
              type: "ID",
            },

            {
              name: "ownerId",
              type: "ID",
            },

            {
              name: "peopleOption",
              type: "String",
            },

            {
              name: "tokenPermissions",
              type: "",
            },

            {
              name: "allowedEmails",
              type: "",
            },

            {
              name: "expireDate",
              type: "Date",
            },
          ],
        },
        endpoints: [],
      },
    ],
  };

  inject(app, config);
};
