USE `courseview`;

CREATE TABLE `user`
(
  `userID` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(100),
  `email` VARCHAR(100),
  `password` VARCHAR(255),
  `isAdmin` INT,
  PRIMARY KEY (`userID`)
);

ALTER TABLE `user`
  ADD COLUMN phone VARCHAR(20) DEFAULT 'N/A',
  ADD COLUMN department VARCHAR(50) DEFAULT 'your department',
  ADD COLUMN minor VARCHAR(50) DEFAULT 'minor',
  ADD COLUMN school VARCHAR(50) DEFAULT 'school year',
  ADD COLUMN major VARCHAR(50) DEFAULT 'major';

CREATE TABLE `userToken`
(
  `tokenKey` VARCHAR(255),
  `createdDate` VARCHAR(100),
  `userID` INT,
  PRIMARY KEY (`tokenKey`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) 
  VALUES ('1', '0', '0', '0', '1');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) 
  VALUES ('admin', 'admin@gmail.com', '$2a$10$7lE8gY1uytxXtbUXFkX30unjimP7JCBIKPBdRushWEzyF4Qb6bZbq', '1');

CREATE TABLE `course`
(
  `courseID` INT AUTO_INCREMENT,
  `crn` INT,
  `subject` VARCHAR(255),
  `courseNumber` INT,
  `section` INT,
  `hours` VARCHAR(255),
  `title` VARCHAR(255),
  `professor` VARCHAR(255),
  `schedule_type` VARCHAR(255),
   PRIMARY KEY (`courseID`)
);

CREATE TABLE `feedback`
(
  `feedbackID` INT AUTO_INCREMENT,
  `userID` INT,
  `name` VARCHAR(100),
  `role` VARCHAR(100),
  `type` VARCHAR(200),
  `comment` TEXT,
  `recommed` VARCHAR(50),
  PRIMARY KEY (`feedbackID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

ALTER TABLE `feedback`
  ADD COLUMN edit VARCHAR(500) DEFAULT 'default_value';

INSERT INTO `feedback` (`userID`, `name`, `role`, `type`, `comment`, `recommed`)
  VALUES (1, 'John Doe', 'Student', 'Feature Request', 'I suggest adding a chat feature to the platform.', 'Yes');

CREATE TABLE `review`
(
  `reviewID` INT AUTO_INCREMENT,
  `courseID` INT,
  `userID` INT,
  `comment` TEXT,
  `reviewDate` DATETIME,
  PRIMARY KEY (`reviewID`),
  FOREIGN KEY (`courseID`) REFERENCES `course`(`courseID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);
