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
ALTER TABLE `user`(
  ADD phone VARCHAR(20) DEFAULT 'N/A',
  ADD department VARCHAR(50) DEFAULT 'your department',
  ADD minor VARCHAR(50) DEFAULT 'minor',
  ADD school VARCHAR(50) DEFAULT 'school year',
  ADD major VARCHAR(50) DEFAULT 'major',
);




CREATE TABLE `userToken`
(
  `tokenKey` VARCHAR(255),
  `createdDate` VARCHAR(100),
  `userID` INT,
  PRIMARY KEY (`tokenKey`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

<<<<<<< HEAD:CSC-SWE-Team11CourseView/server/initial_DB.sql
INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) VALUES ('1', '0', '0', '0', '1');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) VALUES ('admin', 'admin@gmail.com', 'admin', '1');
=======
CREATE TABLE `course`
(
  `courseID` INT AUTO_INCREMENT,
  `CRN` INT,
  `courseAbb` VARCHAR(255),
  `courseNumber` INT,
  `professor` VARCHAR(255),
  `term` VARCHAR(255),
  `department` VARCHAR(255),
);
CREATE TABLE `review`
(
  `reviewID` INT AUTO_INCREMENT,
  `coursesID` INT,
  `userID` INT,
  `comment` TEXT,
  `reviewDate` DATETIME,
  PRIMARY KEY (`reviewID`),
  FOREIGN KEY (`coursesID`) REFERENCES `courses`(`coursesID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) VALUES ('1', '0', '0', '0', '1');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) VALUES ('admin', 'admin@gmail.com', '$2a$10$7lE8gY1uytxXtbUXFkX30unjimP7JCBIKPBdRushWEzyF4Qb6bZbq', '1');
>>>>>>> ancao99/main:server/initial_DB.sql
