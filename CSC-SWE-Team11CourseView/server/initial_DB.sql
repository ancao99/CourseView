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


CREATE TABLE `userToken`
(
  `tokenKey` VARCHAR(255),
  `createdDate` VARCHAR(100),
  `userID` INT,
  PRIMARY KEY (`tokenKey`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

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
