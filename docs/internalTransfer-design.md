# Service Design Specification - Object Design for internalTransfer

**inventory-transferflow-service** documentation

## Document Overview

This document outlines the object design for the `internalTransfer` model in our application. It includes details about the model's attributes, relationships, and any specific validation or business logic that applies.

## internalTransfer Data Object

### Object Overview

**Description:** Represents a transfer request/event moving one or more books between a source and destination branch/section. Stores status, audit trail, and basic transfer metadata.

This object represents a core data structure within the service and acts as the blueprint for database interaction, API generation, and business logic enforcement.
It is defined using the `ObjectSettings` pattern, which governs its behavior, access control, caching strategy, and integration points with other systems such as Stripe and Redis.

### Core Configuration

- **Soft Delete:** Enabled — Determines whether records are marked inactive (`isActive = false`) instead of being physically deleted.
- **Public Access:** Yes — If enabled, anonymous users may access this object’s data depending on route-level rules.

### Properties Schema

| Property               | Type   | Required | Description                                                                            |
| ---------------------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `sourceBranchId`       | ID     | Yes      | Originating branch for the books being transferred.                                    |
| `sourceSectionId`      | ID     | No       | Originating section of the branch, if applicable. Nullable.                            |
| `destinationBranchId`  | ID     | Yes      | Destination branch for the transfer.                                                   |
| `destinationSectionId` | ID     | No       | Destination section in branch; nullable if not by section.                             |
| `status`               | Enum   | Yes      | Current transfer status (initiated, in transit, completed, canceled).                  |
| `reason`               | String | No       | Reason for this transfer (e.g., stock balancing, request). Optional.                   |
| `note`                 | Text   | No       | Optional additional notes for this transfer event/request.                             |
| `transferDate`         | Date   | No       | Date/time when transfer was initiated or is to take effect. Defaults to creation time. |

- Required properties are mandatory for creating objects and must be provided in the request body if no default value is set.

### Default Values

Default values are automatically assigned to properties when a new object is created, if no value is provided in the request body.
Since default values are applied on db level, they should be literal values, not expressions.If you want to use expressions, you can use transposed parameters in any crud route to set default values dynamically.

- **status**: initiated

### Auto Update Properties

`sourceBranchId` `sourceSectionId` `destinationBranchId` `destinationSectionId` `status` `reason` `note` `transferDate`

An update crud route created with the option `Auto Params` enabled will automatically update these properties with the provided values in the request body.
If you want to update any property in your own business logic not by user input, you can set the `Allow Auto Update` option to false.
These properties will be added to the update route's body parameters and can be updated by the user if any value is provided in the request body.

### Enum Properties

Enum properties are defined with a set of allowed values, ensuring that only valid options can be assigned to them.
The enum options value will be stored as strings in the database,
but when a data object is created an addtional property with the same name plus an idx suffix will be created, which will hold the index of the selected enum option.
You can use the index property to sort by the enum value or when your enum options represent a sequence of values.

- **status**: [initiated, inTransit, completed, canceled]

### Elastic Search Indexing

`sourceBranchId` `sourceSectionId` `destinationBranchId` `destinationSectionId` `status` `reason` `transferDate`

Properties that are indexed in Elastic Search will be searchable via the Elastic Search API.
While all properties are stored in the elastic search index of the data object, only those marked for Elastic Search indexing will be available for search queries.

### Relation Properties

`sourceBranchId` `sourceSectionId` `destinationBranchId` `destinationSectionId`

Mindbricks supports relations between data objects, allowing you to define how objects are linked together.
You can define relations in the data object properties, which will be used to create foreign key constraints in the database.
For complex joins operations, Mindbricks supportsa BFF pattern, where you can view dynamic and static views based on Elastic Search Indexes.
Use db level relations for simple one-to-one or one-to-many relationships, and use BFF views for complex joins that require multiple data objects to be joined together.

- **sourceBranchId**: ID
  Relation to `branch`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **sourceSectionId**: ID
  Relation to `section`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

- **destinationBranchId**: ID
  Relation to `branch`.id

The target object is a parent object, meaning that the relation is a one-to-many relationship from target to this object.

On Delete: Set Null
Required: Yes

- **destinationSectionId**: ID
  Relation to `section`.id

The target object is a sibling object, meaning that the relation is a many-to-one or one-to-one relationship from this object to the target.

On Delete: Set Null
Required: No

### Filter Properties

`sourceBranchId` `sourceSectionId` `destinationBranchId` `destinationSectionId` `status` `reason` `transferDate`

Filter properties are used to define parameters that can be used in query filters, allowing for dynamic data retrieval based on user input or predefined criteria.
These properties are automatically mapped as route parameters in the listing CRUD routes that have "Auto Params" enabled.

- **sourceBranchId**: ID has a filter named `sourceBranchId`

- **sourceSectionId**: ID has a filter named `sourceSectionId`

- **destinationBranchId**: ID has a filter named `destinationBranchId`

- **destinationSectionId**: ID has a filter named `destinationSectionId`

- **status**: Enum has a filter named `status`

- **reason**: String has a filter named `reason`

- **transferDate**: Date has a filter named `transferDate`
