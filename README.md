# Athena Automation Dashboard

Welcome to the Athena Automation Dashboard project. This is a web application built with React.

## Project Overview

Athena Automation Dashboard is a React-based web application designed to provide an interface for managing various automation tasks.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/athena-automation-dashboard.git
   ```

2. Navigate to project directory:

   cd athena-automation-dashboard

## Configuring Database

To configure the database connection, you need to create a `.env` file in the root directory of the
express project.

Here's an example of how the `.env` file should look like:

```
      DB_HOST=<db_url_here>
      DB_USER=<db_username>
      DB_PASSWORD=<db_password>
      DB_PORT=<db_port>
      DB_NAME=<db_name>
```

Once the `.env` file is configured, you need to create the required table(s) using the provided schema.

### Database Structure

1. Table- Fields

| Column Name  | Data Type     | Description                                               |
| ------------ | ------------- | --------------------------------------------------------- |
| `field_name` | `VARCHAR(50)` | The name of the field (e.g., status or measurement type). |
| `value`      | `VARCHAR(50)` | The value associated with the field name.                 |

Possible field names include: HIGH, LOW, ZERO, READINGS, NEW_ENTRY, MEDIUM, SETUP, CALIBRATION, START, INSERT_INDEXING, TOOL_BROKEN, BP.

```
CREATE TABLE Fields (
    field_name VARCHAR(50),
    value VARCHAR(50)
);
```

2. Table: Readings

| Column Name  | Data Type                           | Description                         |
| ------------ | ----------------------------------- | ----------------------------------- |
| `ID`         | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Unique identifier for each reading. |
| `ID_Reading` | `VARCHAR(50)`                       | Identifier for the reading.         |
| `OD_Reading` | `VARCHAR(50)`                       | Corresponding output reading.       |

```
CREATE TABLE Readings (
    ID INT NOT NULL AUTO_INCREMENT,
    ID_Reading VARCHAR(50),
    OD_Reading VARCHAR(50),
    PRIMARY KEY (ID)
);
```

3. Table: Df

| Column Name | Data Type                           | Description                          |
| ----------- | ----------------------------------- | ------------------------------------ |
| `ID`        | `INT` (AUTO_INCREMENT, PRIMARY KEY) | Unique identifier for each entry.    |
| `UoM`       | `VARCHAR(20)`                       | Unit of Measure.                     |
| `Feature`   | `VARCHAR(20)`                       | Feature name.                        |
| `USL`       | `VARCHAR(20)`                       | Upper Specification Limit.           |
| `LSL`       | `VARCHAR(20)`                       | Lower Specification Limit.           |
| `SVfCL`     | `VARCHAR(20)`                       | Statistical Value for Control Limit. |
| `Turret`    | `VARCHAR(20)`                       | Associated turret.                   |
| `XZ`        | `VARCHAR(20)`                       | Measurement details.                 |
| `Calhigh`   | `VARCHAR(20)`                       | Calibration high value.              |
| `Callow`    | `VARCHAR(20)`                       | Calibration low value.               |
| `Bias`      | `VARCHAR(20)`                       | Measurement bias.                    |
| `Max`       | `VARCHAR(20)`                       | Maximum value.                       |
| `DependsOn` | `VARCHAR(20)`                       | Dependencies for the feature.        |
| `WVfI`      | `VARCHAR(20)`                       | Value for Indicator.                 |
| `UIW`       | `VARCHAR(20)`                       | User Interface Widget.               |

```
CREATE TABLE Df (
    ID INT AUTO_INCREMENT,
    UoM VARCHAR(20),
    Feature VARCHAR(20),
    USL VARCHAR(20),
    LSL VARCHAR(20),
    SVfCL VARCHAR(20),
    Turret VARCHAR(20),
    XZ VARCHAR(20),
    Calhigh VARCHAR(20),
    Callow VARCHAR(20),
    Bias VARCHAR(20),
    Max VARCHAR(20),
    DependsOn VARCHAR(20),
    WVfI VARCHAR(20),
    UIW VARCHAR(20),
    PRIMARY KEY (ID)
);
```

4. Triggers to set

```
CREATE TRIGGER check_before_insert
BEFORE INSERT ON Readings
FOR EACH ROW
BEGIN
IF (SELECT value FROM Fields WHERE field_name = 'SETUP' LIMIT 1) = 'True' THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Insert not allowed because condition in Fields is not True.';
END IF;
END;
```

```
CREATE TRIGGER after_reading_insert AFTER INSERT
ON Readings
FOR EACH ROW
UPDATE Fields SET value = 'True' WHERE field_name = 'NEW_ENTRY';
```

## Getting Started

STEP 1 : Configure the database

STEP 2 : run the express server

```bash
cd ./express-app
npm install
node app.js
```

STEP 3 : run the react develeopment sserver

```bash
cd .././react-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Page description

### 0.Login Page :

##### [ Username - admin , Password - admin ]

<img src="./images/Login.gif" width=50%>

### 1.Calibration Mode:

The home page is the Calibration mode. This page is used to set the initial offset of the sensor. The user can select the units of measurement and the material type. The user can also select the type of calibration either by entering the offset value or by using the auto calibration feature. The user is also informed of the current state of the device, whether it is in calibration mode or not.

<table>
  <tr>
    <td style="text-align: center; vertical-align: top;">
      <img src="./images/Calibration_ID.png"/>
      <p style="margin: auto;text-align: center;" align="center">ID READINGS</p>
    </td>
    <td style="text-align: center; vertical-align: top;">
      <img src="./images/Calibration_OD.png"  />
      <p style="margin: auto;text-align: center;" align="center">OD READINGS</p>
    </td>
  </tr>
</table>

### 2.SetUp Mode:

The setup mode is used to set the upper and lower specification limits for each feature. The user can select the units of measurement and the material type. The user can also select the type of setup either by entering the offset value or by using the auto setup feature.

<table>
  <tr>
    <td style="text-align: center; vertical-align: top;">
      <img src="./images/SetUp2.png"/>
      <p style="margin: auto;text-align: center;" align="center">SetUP Mode (Zero Calibration)</p>
    </td>
    <td style="text-align: center; vertical-align: top;">
      <img src="./images/SetUp1.png"  />
      <p style="margin: auto;text-align: center;" align="center">SetUP Mode (Success)</p>
    </td>
  </tr>
</table>

### 3.Table:

The table page shows the data from the database in a table format. The user can select which table to view and sort the data by any column. The user can also filter the data by any column. The user can also add new data to the table by clicking the "Add new data" button. The user can edit and delete data by clicking the "Edit" and "Delete" buttons respectively.

<table>
  <tr>
    <td style="text-align: center; vertical-align: top;">
      <img src='./images/Table.png'/>
      <p style="margin: auto;text-align: center;" align="center">Table</p>
    </td>
    <td style="text-align: center; vertical-align: top;">
      <img src='./images/TableAdd.png'  />
      <p style="margin: auto;text-align: center;" align="center">Table Add</p>
    </td>
  </tr>
   <tr>
    <td style="text-align: center; vertical-align: top;">
      <img src='./images/TableDelete.png'/>
      <p style="margin: auto;text-align: center;" align="center">Table Delete</p>
    </td>
    <td style="text-align: center; vertical-align: top;">
      <img src='./images/TableUpdate.png'  />
      <p style="margin: auto;text-align: center;" align="center">Table Update</p>
    </td>
  </tr>
</table>
