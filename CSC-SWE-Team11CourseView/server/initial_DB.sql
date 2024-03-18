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

INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) VALUES ('1', '0', '0', '0', '1');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) VALUES ('admin', 'admin@gmail.com', 'admin', '1');
