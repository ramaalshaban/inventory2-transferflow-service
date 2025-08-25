# Service Design Specification - Object Design for internalTransferLog

**inventory-transferflow-service** documentation

## Document Overview

This document outlines the object design for the `internalTransferLog` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## internalTransferLog Data Object

### Object Overview

**Description:** Audit log for all significant transfer-related events (status changes, line changes, cancellations). Records past state for traceability.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** Yes — If enabled, anonymous users may access this object’s data depending on route-level rules.

### Properties Schema

| Property             | Type | Required | Description                                                                                                   |
| -------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `internalTransferId` | ID   | Yes      | Pointer to the overall transfer this log event refers to.                                                     |
| `transferLineId`     | ID   | No       | Line-level event, pointer to which line/book was involved, nullable.                                          |
| `eventType`          | Enum | Yes      | Type of event (created, statusChanged, lineAdded, lineUpdated, lineRemoved, canceled, completed, etc.).       |
| `oldStatus`          | Enum | No       | Previous status for status change/cancel events (nullable/optional for most other events).                    |
| `newStatus`          | Enum | No       | New status for status change/cancel events (nullable for most other events, mirrors internalTransfer.status). |
| `note`               | Text | No       | Description, comment, or note for this event/change.                                                          |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any crud route to set default values dynamically.

- **eventType**: created

### Constant Properties

`internalTransferId` `transferLineId` `eventType` `oldStatus` `newStatus` `note`

Constant properties are defined to be immutable after creation, meaning they cannot be updated or changed once set. They are typically used for properties that should remain constant throughout the object's lifecycle.
A property is set to be constant if the `Allow Update` option is set to `false`.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **eventType**: [created, statusChanged, lineAdded, lineUpdated, lineRemoved, canceled, completed]

- **oldStatus**: [initiated, inTransit, completed, canceled]

- **newStatus**: [initiated, inTransit, completed, canceled]

### Elastic Search Indexing

`internalTransferId` `transferLineId` `eventType`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Relation Properties

`internalTransferId` `transferLineId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **internalTransferId**: ID
  Relation to `internalTransfer`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **transferLineId**: ID
  Relation to `internalTransferLine`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

### Filter Properties

`internalTransferId` `transferLineId` `eventType`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as route parameters in the listing CRUD routes that have "Auto Params" enabled.

- **internalTransferId**: ID has a filter named `internalTransferId`

- **transferLineId**: ID has a filter named `transferLineId`

- **eventType**: Enum has a filter named `eventType`
