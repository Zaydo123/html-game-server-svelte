# Create Games Table
```sql
CREATE TABLE `games` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Image` text DEFAULT NULL,
  `Date Added` date DEFAULT NULL,
  `Visits` int(11) NOT NULL DEFAULT 0,
  `gamedistribution` text DEFAULT NULL,
  `Extra` mediumtext DEFAULT '{}',
  `Enabled` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

# Create Mirrors Table
```sql
CREATE TABLE `mirrors` (
  `URL` varchar(100) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Visits` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

# Create Requests Table
```sql
CREATE TABLE `requests` (
  `Type` varchar(100) NOT NULL,
  `Details` varchar(2000) DEFAULT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `IP` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```