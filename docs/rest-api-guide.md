# REST API GUIDE

## inventory-transferflow-service

Handles internal inventory transfers (initiate/modify/track/cancel) between branches/sections. Tracks status, records audit log/history, and synchronizes transfer actions with per-location inventory.

## Architectural Design Credit and Contact Information

The architectural design of this microservice is credited to .
For inquiries, feedback, or further information regarding the architecture, please direct your communication to:

Email:

We encourage open communication and welcome any questions or discussions related to the architectural aspects of this microservice.

## Documentation Scope

Welcome to the official documentation for the TransferFlow Service's REST API. This document is designed to provide a comprehensive guide to interfacing with our TransferFlow Service exclusively through RESTful API endpoints.

**Intended Audience**

This documentation is intended for developers and integrators who are looking to interact with the TransferFlow Service via HTTP requests for purposes such as creating, updating, deleting and querying TransferFlow objects.

**Overview**

Within these pages, you will find detailed information on how to effectively utilize the REST API, including authentication methods, request and response formats, endpoint descriptions, and examples of common use cases.

Beyond REST
It's important to note that the TransferFlow Service also supports alternative methods of interaction, such as gRPC and messaging via a Message Broker. These communication methods are beyond the scope of this document. For information regarding these protocols, please refer to their respective documentation.

## Authentication And Authorization

To ensure secure access to the TransferFlow service's protected endpoints, a project-wide access token is required. This token serves as the primary method for authenticating requests to our service. However, it's important to note that access control varies across different routes:

**Protected Routes**:
Certain routes require specific authorization levels. Access to these routes is contingent upon the possession of a valid access token that meets the route-specific authorization criteria. Unauthorized requests to these routes will be rejected.

**Public Routes**:
The service also includes routes that are accessible without authentication. These public endpoints are designed for open access and do not require an access token.

### Token Locations

When including your access token in a request, ensure it is placed in one of the following specified locations. The service will sequentially search these locations for the token, utilizing the first one it encounters.

| Location             | Token Name / Param Name |
| -------------------- | ----------------------- |
| Query                | access_token            |
| Authorization Header | Bearer                  |
| Header               | inventory2-access-token |
| Cookie               | inventory2-access-token |

Please ensure the token is correctly placed in one of these locations, using the appropriate label as indicated. The service prioritizes these locations in the order listed, processing the first token it successfully identifies.

## Api Definitions

This section outlines the API endpoints available within the TransferFlow service. Each endpoint can receive parameters through various methods, meticulously described in the following definitions. It's important to understand the flexibility in how parameters can be included in requests to effectively interact with the TransferFlow service.

This service is configured to listen for HTTP requests on port `3002`,
serving both the main API interface and default administrative endpoints.

The following routes are available by default:

- **API Test Interface (API Face):** `/`
- **Swagger Documentation:** `/swagger`
- **Postman Collection Download:** `/getPostmanCollection`
- **Health Checks:** `/health` and `/admin/health`
- **Current Session Info:** `/currentuser`
- **Favicon:** `/favicon.ico`

This service is accessible via the following environment-specific URLs:

- **Preview:** `https://transferFlow-api-inventory2.prw.mindbricks.com`
- **Staging:** `https://transferFlow-api-inventory2.staging.mindbricks.com`
- **Production:** `https://transferFlow-api-inventory2.prod.mindbricks.com`

**Parameter Inclusion Methods:**
Parameters can be incorporated into API requests in several ways, each with its designated location. Understanding these methods is crucial for correctly constructing your requests:

**Query Parameters:** Included directly in the URL's query string.

**Path Parameters:** Embedded within the URL's path.

**Body Parameters:** Sent within the JSON body of the request.

**Session Parameters:** Automatically read from the session object. This method is used for parameters that are intrinsic to the user's session, such as userId. When using an API that involves session parameters, you can omit these from your request. The service will automatically bind them to the route, provided that a session is associated with your request.

**Note on Session Parameters:**
Session parameters represent a unique method of parameter inclusion, relying on the context of the user's session. A common example of a session parameter is userId, which the service automatically associates with your request when a session exists. This feature ensures seamless integration of user-specific data without manual input for each request.

By adhering to the specified parameter inclusion methods, you can effectively utilize the TransferFlow service's API endpoints. For detailed information on each endpoint, including required parameters and their accepted locations, refer to the individual API definitions below.

### Common Parameters

The `TransferFlow` service's routes support several common parameters designed to modify and enhance the behavior of API requests. These parameters are not individually listed in the API route definitions to avoid repetition. Instead, refer to this section to understand how to leverage these common behaviors across different routes. Note that all common parameters should be included in the query part of the URL.

### Supported Common Parameters:

- **getJoins (BOOLEAN)**: Controls whether to retrieve associated objects along with the main object. By default, `getJoins` is assumed to be `true`. Set it to `false` if you prefer to receive only the main fields of an object, excluding its associations.

- **excludeCQRS (BOOLEAN)**: Applicable only when `getJoins` is `true`. By default, `excludeCQRS` is set to `false`. Enabling this parameter (`true`) omits non-local associations, which are typically more resource-intensive as they require querying external services like ElasticSearch for additional information. Use this to optimize response times and resource usage.

- **requestId (String)**: Identifies a request to enable tracking through the service's log chain. A random hex string of 32 characters is assigned by default. If you wish to use a custom `requestId`, simply include it in your query parameters.

- **caching (BOOLEAN)**: Determines the use of caching for query routes. By default, caching is enabled (`true`). To ensure the freshest data directly from the database, set this parameter to `false`, bypassing the cache.

- **cacheTTL (Integer)**: Specifies the Time-To-Live (TTL) for query caching, in seconds. This is particularly useful for adjusting the default caching duration (5 minutes) for `get list` queries. Setting a custom `cacheTTL` allows you to fine-tune the cache lifespan to meet your needs.

- **pageNumber (Integer)**: For paginated `get list` routes, this parameter selects which page of results to retrieve. The default is `1`, indicating the first page. To disable pagination and retrieve all results, set `pageNumber` to `0`.

- **pageRowCount (Integer)**: In conjunction with paginated routes, this parameter defines the number of records per page. The default value is `25`. Adjusting `pageRowCount` allows you to control the volume of data returned in a single request.

By utilizing these common parameters, you can tailor the behavior of API requests to suit your specific requirements, ensuring optimal performance and usability of the `TransferFlow` service.

### Error Response

If a request encounters an issue, whether due to a logical fault or a technical problem, the service responds with a standardized JSON error structure. The HTTP status code within this response indicates the nature of the error, utilizing commonly recognized codes for clarity:

- **400 Bad Request**: The request was improperly formatted or contained invalid parameters, preventing the server from processing it.
- **401 Unauthorized**: The request lacked valid authentication credentials or the credentials provided do not grant access to the requested resource.
- **404 Not Found**: The requested resource was not found on the server.
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

Each error response is structured to provide meaningful insight into the problem, assisting in diagnosing and resolving issues efficiently.

```js
{
  "result": "ERR",
  "status": 400,
  "message": "errMsg_organizationIdisNotAValidID",
  "errCode": 400,
  "date": "2024-03-19T12:13:54.124Z",
  "detail": "String"
}
```

### Object Structure of a Successfull Response

When the `TransferFlow` service processes requests successfully, it wraps the requested resource(s) within a JSON envelope. This envelope not only contains the data but also includes essential metadata, such as configuration details and pagination information, to enrich the response and provide context to the client.

**Key Characteristics of the Response Envelope:**

- **Data Presentation**: Depending on the nature of the request, the service returns either a single data object or an array of objects encapsulated within the JSON envelope.
  - **Creation and Update Routes**: These routes return the unmodified (pure) form of the data object(s), without any associations to other data objects.
  - **Delete Routes**: Even though the data is removed from the database, the last known state of the data object(s) is returned in its pure form.
  - **Get Requests**: A single data object is returned in JSON format.
  - **Get List Requests**: An array of data objects is provided, reflecting a collection of resources.

- **Data Structure and Joins**: The complexity of the data structure in the response can vary based on the route's architectural design and the join options specified in the request. The architecture might inherently limit join operations, or they might be dynamically controlled through query parameters.
  - **Pure Data Forms**: In some cases, the response mirrors the exact structure found in the primary data table, without extensions.
  - **Extended Data Forms**: Alternatively, responses might include data extended through joins with tables within the same service or aggregated from external sources, such as ElasticSearch indices related to other services.
  - **Join Varieties**: The extensions might involve one-to-one joins, resulting in single object associations, or one-to-many joins, leading to an array of objects. In certain instances, the data might even feature nested inclusions from other data objects.

**Design Considerations**: The structure of a route's response data is meticulously crafted during the service's architectural planning. This design ensures that responses adequately reflect the intended data relationships and service logic, providing clients with rich and meaningful information.

**Brief Data**: Certain routes return a condensed version of the object data, intentionally selecting only specific fields deemed useful for that request. In such instances, the route documentation will detail the properties included in the response, guiding developers on what to expect.

### API Response Structure

The API utilizes a standardized JSON envelope to encapsulate responses. This envelope is designed to consistently deliver both the requested data and essential metadata, ensuring that clients can efficiently interpret and utilize the response.

**HTTP Status Codes:**

- **200 OK**: This status code is returned for successful GET, GETLIST, UPDATE, or DELETE operations, indicating that the request has been processed successfully.
- **201 Created**: This status code is specific to CREATE operations, signifying that the requested resource has been successfully created.

**Success Response Format:**

For successful operations, the response includes a `"status": "OK"` property, signaling the successful execution of the request. The structure of a successful response is outlined below:

```json
{
  "status":"OK",
  "statusCode": 200,
  "elapsedMs":126,
  "ssoTime":120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName":"products",
  "method":"GET",
  "action":"getList",
  "appVersion":"Version",
  "rowCount":3
  "products":[{},{},{}],
  "paging": {
    "pageNumber":1,
    "pageRowCount":25,
    "totalRowCount":3,
    "pageCount":1
  },
  "filters": [],
  "uiPermissions": []
}
```

- **`products`**: In this example, this key contains the actual response content, which may be a single object or an array of objects depending on the operation performed.

**Handling Errors:**

For details on handling error scenarios and understanding the structure of error responses, please refer to the "Error Response" section provided earlier in this documentation. It outlines how error conditions are communicated, including the use of HTTP status codes and standardized JSON structures for error messages.

**Route Validation Layers:**

Route Validations may be executed in 4 different layers. The layer is a kind of time definition in the route life cycle. Note that while conditional check times are defined by layers, the fetch actions are defined by access times.

`layer1`: "The first layer of route life cycle which is just after the request parameters are validated and the request is in controller. Any script, validation or data operation in this layer can access the route parameters only. The beforeInstance data is not ready yet."

`layer2`: "The second layer of route life cycle which is just after beforeInstance data is collected before the main operation of the route and the main operation is not started yet. In this layer the collected supplementary data is accessable with the route parameters."

`layer3`: "The third layer of route life cycle which is just after the main operation of the route is completed. In this layer the main operation result is accessable with the beforeInstance data and route parameters. Note that the afterInstance data is not ready yet."

`layer4`: "The last layer of route life cycle which is just after afterInstance supplementary data is collected. In this layer the afterInstance data is accessable with the main operation result, beforeInstance data and route parameters."

## Resources

TransferFlow service provides the following resources which are stored in its own database as a data object. Note that a resource for an api access is a data object for the service.

### InternalTransfer resource

_Resource Definition_ : Represents a transfer request/event moving one or more books between a source and destination branch/section. Stores status, audit trail, and basic transfer metadata.
_InternalTransfer Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **sourceBranchId** | ID | | | _Originating branch for the books being transferred._ |
| **sourceSectionId** | ID | | | _Originating section of the branch, if applicable. Nullable._ |
| **destinationBranchId** | ID | | | _Destination branch for the transfer._ |
| **destinationSectionId** | ID | | | _Destination section in branch; nullable if not by section._ |
| **status** | Enum | | | _Current transfer status (initiated, in transit, completed, canceled)._ |
| **reason** | String | | | _Reason for this transfer (e.g., stock balancing, request). Optional._ |
| **note** | Text | | | _Optional additional notes for this transfer event/request._ |
| **transferDate** | Date | | | _Date/time when transfer was initiated or is to take effect. Defaults to creation time._ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### status Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **initiated** | `"initiated""` | 0 |
| **inTransit** | `"inTransit""` | 1 |
| **completed** | `"completed""` | 2 |
| **canceled** | `"canceled""` | 3 |

### InternalTransferLine resource

_Resource Definition_ : A line item in an internal transfer, representing a specific book being moved and its quantity, linked to a parent transfer event.
_InternalTransferLine Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **internalTransferId** | ID | | | _Parent transfer event this line belongs to._ |
| **bookId** | ID | | | _Book to be transferred._ |
| **quantity** | Integer | | | _Number of copies of the book to transfer (must be positive)._ |
| **note** | Text | | | _Optional note per transfer line (e.g., batch, special instruction)._ |

### InternalTransferLog resource

_Resource Definition_ : Audit log for all significant transfer-related events (status changes, line changes, cancellations). Records past state for traceability.
_InternalTransferLog Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **internalTransferId** | ID | | | _Pointer to the overall transfer this log event refers to._ |
| **transferLineId** | ID | | | _Line-level event, pointer to which line/book was involved, nullable._ |
| **eventType** | Enum | | | _Type of event (created, statusChanged, lineAdded, lineUpdated, lineRemoved, canceled, completed, etc.)._ |
| **oldStatus** | Enum | | | _Previous status for status change/cancel events (nullable/optional for most other events)._ |
| **newStatus** | Enum | | | _New status for status change/cancel events (nullable for most other events, mirrors internalTransfer.status)._ |
| **note** | Text | | | _Description, comment, or note for this event/change._ |

#### Enum Properties

Enum properties are represented as Small Integer values (0-255) in the database. The values are mapped to their corresponding names in the application layer.

##### eventType Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **created** | `"created""` | 0 |
| **statusChanged** | `"statusChanged""` | 1 |
| **lineAdded** | `"lineAdded""` | 2 |
| **lineUpdated** | `"lineUpdated""` | 3 |
| **lineRemoved** | `"lineRemoved""` | 4 |
| **canceled** | `"canceled""` | 5 |
| **completed** | `"completed""` | 6 |

##### oldStatus Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **initiated** | `"initiated""` | 0 |
| **inTransit** | `"inTransit""` | 1 |
| **completed** | `"completed""` | 2 |
| **canceled** | `"canceled""` | 3 |

##### newStatus Enum Property

_Enum Options_
| Name | Value | Index |
| ---- | ----- | ----- |
| **initiated** | `"initiated""` | 0 |
| **inTransit** | `"inTransit""` | 1 |
| **completed** | `"completed""` | 2 |
| **canceled** | `"canceled""` | 3 |

### TransferFlowShareToken resource

_Resource Definition_ : A data object that stores the share tokens for tokenized access to shared objects.
_TransferFlowShareToken Resource Properties_
| Name | Type | Required | Default | Definition |
| ---- | ---- | -------- | ------- | ---------- |
| **configName** | String | | | _A string value to represent the related configuration of the shared token._ |
| **objectName** | String | | | _A string value to represent the type name of the shared object like `report`, `document`._ |
| **objectId** | ID | | | _An ID value to represent the shared target data object instance._ |
| **ownerId** | ID | | | _An ID value to represent the user who shared the object by creating this token._ |
| **peopleOption** | String | | | _A string value to represent the access option of the share token. It can be either anyoneWithLink or specificEmails._ |
| **tokenPermissions** | | | | _A string array to store the names of permissions (or roles) by the sharing user._ |
| **allowedEmails** | | | | _A string array to store the allowed emails if the peopleOption is specificEmails._ |
| **expireDate** | Date | | | _A date value to specify the expire date of the token. Null for infinite token._ |

## Crud Routes

### Route: getInternalTransfer

_Route Definition_ : Get transfer request by id.

_Route Type_ : get

_Default access route_ : _GET_ `/internaltransfers/:internalTransferId`

#### Parameters

The getInternalTransfer api has got 1 parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| internalTransferId | ID   | true     | request.params?.internalTransferId |

To access the api you can use the **REST** controller with the path **GET /internaltransfers/:internalTransferId**

```js
axios({
  method: "GET",
  url: `/internaltransfers/${internalTransferId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransfer`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransfer",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransfer": { "id": "ID", "isActive": true }
}
```

### Route: getInternalTransferByStatus

_Route Definition_ : Get a transfer with given status (e.g., to check or update).

_Route Type_ : get

_Default access route_ : _GET_ `/internaltransferbystatus/:internalTransferId`

#### Parameters

The getInternalTransferByStatus api has got 2 parameters

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| status             | Enum | true     | request.query?.status              |
| internalTransferId | ID   | true     | request.params?.internalTransferId |

To access the api you can use the **REST** controller with the path **GET /internaltransferbystatus/:internalTransferId**

```js
axios({
  method: "GET",
  url: `/internaltransferbystatus/${internalTransferId}`,
  data: {},
  params: {
    status: '"Enum"',
  },
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransfer`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransfer",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransfer": { "id": "ID", "isActive": true }
}
```

### Route: createInternalTransfer

_Route Definition_ : Create a new internal book transfer (between branches/sections).

_Route Type_ : create

_Default access route_ : _POST_ `/internaltransfers`

#### Parameters

The createInternalTransfer api has got 8 parameters

| Parameter            | Type   | Required | Population                         |
| -------------------- | ------ | -------- | ---------------------------------- |
| sourceBranchId       | ID     | true     | request.body?.sourceBranchId       |
| sourceSectionId      | ID     | false    | request.body?.sourceSectionId      |
| destinationBranchId  | ID     | true     | request.body?.destinationBranchId  |
| destinationSectionId | ID     | false    | request.body?.destinationSectionId |
| status               | Enum   | true     | request.body?.status               |
| reason               | String | false    | request.body?.reason               |
| note                 | Text   | false    | request.body?.note                 |
| transferDate         | Date   | false    | request.body?.transferDate         |

To access the api you can use the **REST** controller with the path **POST /internaltransfers**

```js
axios({
  method: "POST",
  url: "/internaltransfers",
  data: {
    sourceBranchId: "ID",
    sourceSectionId: "ID",
    destinationBranchId: "ID",
    destinationSectionId: "ID",
    status: "Enum",
    reason: "String",
    note: "Text",
    transferDate: "Date",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransfer`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransfer",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransfer": { "id": "ID", "isActive": true }
}
```

### Route: updateInternalTransfer

_Route Definition_ : Update transfer (change status, details, or cancel before completion).

_Route Type_ : update

_Default access route_ : _PATCH_ `/internaltransfers/:internalTransferId`

#### Parameters

The updateInternalTransfer api has got 9 parameters

| Parameter            | Type   | Required | Population                         |
| -------------------- | ------ | -------- | ---------------------------------- |
| internalTransferId   | ID     | true     | request.params?.internalTransferId |
| sourceBranchId       | ID     | false    | request.body?.sourceBranchId       |
| sourceSectionId      | ID     | false    | request.body?.sourceSectionId      |
| destinationBranchId  | ID     | false    | request.body?.destinationBranchId  |
| destinationSectionId | ID     | false    | request.body?.destinationSectionId |
| status               | Enum   | false    | request.body?.status               |
| reason               | String | false    | request.body?.reason               |
| note                 | Text   | false    | request.body?.note                 |
| transferDate         | Date   | false    | request.body?.transferDate         |

To access the api you can use the **REST** controller with the path **PATCH /internaltransfers/:internalTransferId**

```js
axios({
  method: "PATCH",
  url: `/internaltransfers/${internalTransferId}`,
  data: {
    sourceBranchId: "ID",
    sourceSectionId: "ID",
    destinationBranchId: "ID",
    destinationSectionId: "ID",
    status: "Enum",
    reason: "String",
    note: "Text",
    transferDate: "Date",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransfer`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransfer",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransfer": { "id": "ID", "isActive": true }
}
```

### Route: deleteInternalTransfer

_Route Definition_ : Delete/cancel a transfer request if not completed. Soft-delete by default.

_Route Type_ : delete

_Default access route_ : _DELETE_ `/internaltransfers/:internalTransferId`

#### Parameters

The deleteInternalTransfer api has got 1 parameter

| Parameter          | Type | Required | Population                         |
| ------------------ | ---- | -------- | ---------------------------------- |
| internalTransferId | ID   | true     | request.params?.internalTransferId |

To access the api you can use the **REST** controller with the path **DELETE /internaltransfers/:internalTransferId**

```js
axios({
  method: "DELETE",
  url: `/internaltransfers/${internalTransferId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransfer`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransfer",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransfer": { "id": "ID", "isActive": false }
}
```

### Route: listInternalTransfers

_Route Definition_ : List all transfer requests, filterable by properties (branch, status, date, etc.) for trace/audit.

_Route Type_ : getList

_Default access route_ : _GET_ `/internaltransfers`

The listInternalTransfers api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /internaltransfers**

```js
axios({
  method: "GET",
  url: "/internaltransfers",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransfers`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransfers",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "internalTransfers": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getInternalTransferLine

_Route Definition_ : Get a specific transfer line by id.

_Route Type_ : get

_Default access route_ : _GET_ `/internaltransferlines/:internalTransferLineId`

#### Parameters

The getInternalTransferLine api has got 1 parameter

| Parameter              | Type | Required | Population                             |
| ---------------------- | ---- | -------- | -------------------------------------- |
| internalTransferLineId | ID   | true     | request.params?.internalTransferLineId |

To access the api you can use the **REST** controller with the path **GET /internaltransferlines/:internalTransferLineId**

```js
axios({
  method: "GET",
  url: `/internaltransferlines/${internalTransferLineId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLine`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLine",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLine": { "id": "ID", "isActive": true }
}
```

### Route: createInternalTransferLine

_Route Definition_ : Create a new transfer line item (for a specific book in the transfer).

_Route Type_ : create

_Default access route_ : _POST_ `/internaltransferlines`

#### Parameters

The createInternalTransferLine api has got 4 parameters

| Parameter          | Type    | Required | Population                       |
| ------------------ | ------- | -------- | -------------------------------- |
| internalTransferId | ID      | true     | request.body?.internalTransferId |
| bookId             | ID      | true     | request.body?.bookId             |
| quantity           | Integer | true     | request.body?.quantity           |
| note               | Text    | false    | request.body?.note               |

To access the api you can use the **REST** controller with the path **POST /internaltransferlines**

```js
axios({
  method: "POST",
  url: "/internaltransferlines",
  data: {
    internalTransferId: "ID",
    bookId: "ID",
    quantity: "Integer",
    note: "Text",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLine`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLine",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLine": { "id": "ID", "isActive": true }
}
```

### Route: updateInternalTransferLine

_Route Definition_ : Update attributes (quantity, note) for a transfer line if modifiable.

_Route Type_ : update

_Default access route_ : _PATCH_ `/internaltransferlines/:internalTransferLineId`

#### Parameters

The updateInternalTransferLine api has got 5 parameters

| Parameter              | Type    | Required | Population                             |
| ---------------------- | ------- | -------- | -------------------------------------- |
| internalTransferLineId | ID      | true     | request.params?.internalTransferLineId |
| internalTransferId     | ID      | false    | request.body?.internalTransferId       |
| bookId                 | ID      | false    | request.body?.bookId                   |
| quantity               | Integer | false    | request.body?.quantity                 |
| note                   | Text    | false    | request.body?.note                     |

To access the api you can use the **REST** controller with the path **PATCH /internaltransferlines/:internalTransferLineId**

```js
axios({
  method: "PATCH",
  url: `/internaltransferlines/${internalTransferLineId}`,
  data: {
    internalTransferId: "ID",
    bookId: "ID",
    quantity: "Integer",
    note: "Text",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLine`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLine",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLine": { "id": "ID", "isActive": true }
}
```

### Route: deleteInternalTransferLine

_Route Definition_ : Remove a transfer line (if not locked).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/internaltransferlines/:internalTransferLineId`

#### Parameters

The deleteInternalTransferLine api has got 1 parameter

| Parameter              | Type | Required | Population                             |
| ---------------------- | ---- | -------- | -------------------------------------- |
| internalTransferLineId | ID   | true     | request.params?.internalTransferLineId |

To access the api you can use the **REST** controller with the path **DELETE /internaltransferlines/:internalTransferLineId**

```js
axios({
  method: "DELETE",
  url: `/internaltransferlines/${internalTransferLineId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLine`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLine",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLine": { "id": "ID", "isActive": false }
}
```

### Route: listInternalTransferLines

_Route Definition_ : List transfer lines (children of a transfer), filterable by parent, book, etc.

_Route Type_ : getList

_Default access route_ : _GET_ `/internaltransferlines`

The listInternalTransferLines api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /internaltransferlines**

```js
axios({
  method: "GET",
  url: "/internaltransferlines",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLines`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLines",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "internalTransferLines": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Route: getInternalTransferLog

_Route Definition_ : Get audit log entry by id.

_Route Type_ : get

_Default access route_ : _GET_ `/internaltransferlogs/:internalTransferLogId`

#### Parameters

The getInternalTransferLog api has got 1 parameter

| Parameter             | Type | Required | Population                            |
| --------------------- | ---- | -------- | ------------------------------------- |
| internalTransferLogId | ID   | true     | request.params?.internalTransferLogId |

To access the api you can use the **REST** controller with the path **GET /internaltransferlogs/:internalTransferLogId**

```js
axios({
  method: "GET",
  url: `/internaltransferlogs/${internalTransferLogId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLog`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLog",
  "action": "get",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLog": { "id": "ID", "isActive": true }
}
```

### Route: createInternalTransferLog

_Route Definition_ : Record a transfer-related audit event.

_Route Type_ : create

_Default access route_ : _POST_ `/internaltransferlogs`

#### Parameters

The createInternalTransferLog api has got 6 parameters

| Parameter          | Type | Required | Population                       |
| ------------------ | ---- | -------- | -------------------------------- |
| internalTransferId | ID   | true     | request.body?.internalTransferId |
| transferLineId     | ID   | false    | request.body?.transferLineId     |
| eventType          | Enum | true     | request.body?.eventType          |
| oldStatus          | Enum | false    | request.body?.oldStatus          |
| newStatus          | Enum | false    | request.body?.newStatus          |
| note               | Text | false    | request.body?.note               |

To access the api you can use the **REST** controller with the path **POST /internaltransferlogs**

```js
axios({
  method: "POST",
  url: "/internaltransferlogs",
  data: {
    internalTransferId: "ID",
    transferLineId: "ID",
    eventType: "Enum",
    oldStatus: "Enum",
    newStatus: "Enum",
    note: "Text",
  },
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLog`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLog",
  "action": "create",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLog": { "id": "ID", "isActive": true }
}
```

### Route: updateInternalTransferLog

_Route Definition_ : Update transfer log record (if absolutely needed/correcting typo only).

_Route Type_ : update

_Default access route_ : _PATCH_ `/internaltransferlogs/:internalTransferLogId`

#### Parameters

The updateInternalTransferLog api has got 1 parameter

| Parameter             | Type | Required | Population                            |
| --------------------- | ---- | -------- | ------------------------------------- |
| internalTransferLogId | ID   | true     | request.params?.internalTransferLogId |

To access the api you can use the **REST** controller with the path **PATCH /internaltransferlogs/:internalTransferLogId**

```js
axios({
  method: "PATCH",
  url: `/internaltransferlogs/${internalTransferLogId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLog`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLog",
  "action": "update",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLog": { "id": "ID", "isActive": true }
}
```

### Route: deleteInternalTransferLog

_Route Definition_ : Soft-delete a transfer log if needed (should almost never be needed).

_Route Type_ : delete

_Default access route_ : _DELETE_ `/internaltransferlogs/:internalTransferLogId`

#### Parameters

The deleteInternalTransferLog api has got 1 parameter

| Parameter             | Type | Required | Population                            |
| --------------------- | ---- | -------- | ------------------------------------- |
| internalTransferLogId | ID   | true     | request.params?.internalTransferLogId |

To access the api you can use the **REST** controller with the path **DELETE /internaltransferlogs/:internalTransferLogId**

```js
axios({
  method: "DELETE",
  url: `/internaltransferlogs/${internalTransferLogId}`,
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLog`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLog",
  "action": "delete",
  "appVersion": "Version",
  "rowCount": 1,
  "internalTransferLog": { "id": "ID", "isActive": false }
}
```

### Route: listInternalTransferLogs

_Route Definition_ : List all logs for transfers (filter by transfer, status, event type, date).

_Route Type_ : getList

_Default access route_ : _GET_ `/internaltransferlogs`

The listInternalTransferLogs api has got no parameters.

To access the api you can use the **REST** controller with the path **GET /internaltransferlogs**

```js
axios({
  method: "GET",
  url: "/internaltransferlogs",
  data: {},
  params: {},
});
```

The API response is encapsulated within a JSON envelope. Successful operations return an HTTP status code of 200 for get, getlist, update, or delete requests, and 201 for create requests. Each successful response includes a `"status": "OK"` property. For error handling, refer to the "Error Response" section.

Following JSON represents the most comprehensive form of the **`internalTransferLogs`** object in the respones. However, some properties may be omitted based on the object's internal logic.

```json
{
  "status": "OK",
  "statusCode": "200",
  "elapsedMs": 126,
  "ssoTime": 120,
  "source": "db",
  "cacheKey": "hexCode",
  "userId": "ID",
  "sessionId": "ID",
  "requestId": "ID",
  "dataName": "internalTransferLogs",
  "action": "getList",
  "appVersion": "Version",
  "rowCount": "\"Number\"",
  "internalTransferLogs": [{ "id": "ID", "isActive": true }, {}, {}],
  "paging": {
    "pageNumber": "Number",
    "pageRowCount": "NUmber",
    "totalRowCount": "Number",
    "pageCount": "Number"
  },
  "filters": [],
  "uiPermissions": []
}
```

### Authentication Specific Routes

### Common Routes

### Route: currentuser

_Route Definition_: Retrieves the currently authenticated user's session information.

_Route Type_: sessionInfo

_Access Route_: `GET /currentuser`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Returns the authenticated session object associated with the current access token.
- If no valid session exists, responds with a 401 Unauthorized.

```js
// Sample GET /currentuser call
axios.get("/currentuser", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**
Returns the session object, including user-related data and token information.

```
{
  "sessionId": "9cf23fa8-07d4-4e7c-80a6-ec6d6ac96bb9",
  "userId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
  "email": "user@example.com",
  "fullname": "John Doe",
  "roleId": "user",
  "tenantId": "abc123",
  "accessToken": "jwt-token-string",
  ...
}
```

**Error Response**
**401 Unauthorized:** No active session found.

```
{
  "status": "ERR",
  "message": "No login found"
}
```

**Notes**

- This route is typically used by frontend or mobile applications to fetch the current session state after login.
- The returned session includes key user identity fields, tenant information (if applicable), and the access token for further authenticated requests.
- Always ensure a valid access token is provided in the request to retrieve the session.

### Route: permissions

`*Route Definition*`: Retrieves all effective permission records assigned to the currently authenticated user.

`*Route Type*`: permissionFetch

_Access Route_: `GET /permissions`

#### Parameters

This route does **not** require any request parameters.

#### Behavior

- Fetches all active permission records (`givenPermissions` entries) associated with the current user session.
- Returns a full array of permission objects.
- Requires a valid session (`access token`) to be available.

```js
// Sample GET /permissions call
axios.get("/permissions", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**

Returns an array of permission objects.

```json
[
  {
    "id": "perm1",
    "permissionName": "adminPanel.access",
    "roleId": "admin",
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  },
  {
    "id": "perm2",
    "permissionName": "orders.manage",
    "roleId": null,
    "subjectUserId": "d92b9d4c-9b1e-4e95-842e-3fb9c8c1df38",
    "subjectUserGroupId": null,
    "objectId": null,
    "canDo": true,
    "tenantCodename": "store123"
  }
]
```

Each object reflects a single permission grant, aligned with the givenPermissions model:

- `**permissionName**`: The permission the user has.
- `**roleId**`: If the permission was granted through a role. -` **subjectUserId**`: If directly granted to the user.
- `**subjectUserGroupId**`: If granted through a group.
- `**objectId**`: If tied to a specific object (OBAC).
- `**canDo**`: True or false flag to represent if permission is active or restricted.

**Error Responses**

- **401 Unauthorized**: No active session found.

```json
{
  "status": "ERR",
  "message": "No login found"
}
```

- **500 Internal Server Error**: Unexpected error fetching permissions.

**Notes**

- The /permissions route is available across all backend services generated by Mindbricks, not just the auth service.
- Auth service: Fetches permissions freshly from the live database (givenPermissions table).
- Other services: Typically use a cached or projected view of permissions stored in a common ElasticSearch store, optimized for faster authorization checks.

> **Tip**:
> Applications can cache permission results client-side or server-side, but should occasionally refresh by calling this endpoint, especially after login or permission-changing operations.

### Route: permissions/:permissionName

_Route Definition_: Checks whether the current user has access to a specific permission, and provides a list of scoped object exceptions or inclusions.

_Route Type_: permissionScopeCheck

_Access Route_: `GET /permissions/:permissionName`

#### Parameters

| Parameter      | Type   | Required | Population                      |
| -------------- | ------ | -------- | ------------------------------- |
| permissionName | String | Yes      | `request.params.permissionName` |

#### Behavior

- Evaluates whether the current user **has access** to the given `permissionName`.
- Returns a structured object indicating:
  - Whether the permission is generally granted (`canDo`)
  - Which object IDs are explicitly included or excluded from access (`exceptions`)
- Requires a valid session (`access token`).

```js
// Sample GET /permissions/orders.manage
axios.get("/permissions/orders.manage", {
  headers: {
    Authorization: "Bearer your-jwt-token",
  },
});
```

**Success Response**

```json
{
  "canDo": true,
  "exceptions": [
    "a1f2e3d4-xxxx-yyyy-zzzz-object1",
    "b2c3d4e5-xxxx-yyyy-zzzz-object2"
  ]
}
```

- If `canDo` is `true`, the user generally has the permission, but not for the objects listed in `exceptions` (i.e., restrictions).
- If `canDo` is `false`, the user does not have the permission by default — but only for the objects in `exceptions`, they do have permission (i.e., selective overrides).
- The exceptions array contains valid **UUID strings**, each corresponding to an object ID (typically from the data model targeted by the permission).

## Copyright

All sources, documents and other digital materials are copyright of .

## About Us

For more information please visit our website: .

.
.
