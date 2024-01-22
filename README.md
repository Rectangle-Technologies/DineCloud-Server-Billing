
# Billing Server Backend Docs

This project contains API endpoints for Billing Management server.




## Installation

To run the project, first clone the project from github with the following command

```bash
  git clone git@github.com:Rectangle-Technologies/DineCloud-Server-Billing.git
```
Install the node modules

```bash
  npm i
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`NODE_ENV`

`PORT`

`JWT_ALGORITHM`

`ENCRYPTION_ALGORITHM`

`JWT_TOKEN_SECRET`

`AES_GCM_ENCRYPTION_KEY`

`AES_GCM_ENCRYPTION_IV`

`FEATURE_API_INPUT_SCHEMA_VALIDATION`

`DINECLOUD_DOMAINMODEL_SERVER_URL`


## Start the server

To start the server run

```bash
  node index.js
```


## API Reference

**Note:** Anything written within ${} represents a variable and has to be replaced by the value.

### Table

#### 1. Create table

```http
  POST /api/table/createTable
```

It creates a new table.

**Headers**
| Parameter | Value  |
| :-------- | :------- |
| `Authorization`      | `Bearer ${token}` | 

**Body**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `number`      | `string` | **Required**. Number of the table |
| `branchId`      | `string` | **Required**. Branch id of the client |
| `branchCode`      | `string` | **Required**. Branch code of the client |
| `seatingCapacity`      | `string` | Seating capacity of the table |

#### 2. Get all tables

```http
  POST /api/table/getAllTables
```

It fetches all the tables.

**Headers**
| Parameter | Value  |
| :-------- | :------- |
| `Authorization`      | `Bearer ${token}` | 

**Body**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `branchId`      | `string` | **Required**. Branch id of the client |
| `branchCode`      | `string` | **Required**. Branch code of the client |

#### 3. Get a table by id

```http
  POST /api/table/getTableById?id={id}
```

It fetches a table by id.

**Headers**
| Parameter | Value  |
| :-------- | :------- |
| `Authorization`      | `Bearer ${token}` | 

**Body**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `branchId`      | `string` | **Required**. Branch id of the client |
| `branchCode`      | `string` | **Required**. Branch code of the client |

#### 4. Update a table 

```http
  PUT /api/table/updateTable?id={id}
```

It updates a table.

**Headers**
| Parameter | Value  |
| :-------- | :------- |
| `Authorization`      | `Bearer ${token}` | 

**Body**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `number`      | `string` | **Required**. Number of the table |
| `branchId`      | `string` | **Required**. Branch id of the client |
| `branchCode`      | `string` | **Required**. Branch code of the client |
| `seatingCapacity`      | `string` | Seating capacity of the table |

#### 5. Delete a table 

```http
  DELETE /api/table/deleteTable?id={id}
```

It deletes a table.

**Headers**
| Parameter | Value  |
| :-------- | :------- |
| `Authorization`      | `Bearer ${token}` | 

**Body**

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `branchId`      | `string` | **Required**. Branch id of the client |
| `branchCode`      | `string` | **Required**. Branch code of the client |
