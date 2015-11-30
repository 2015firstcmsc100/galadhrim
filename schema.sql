CREATE TABLE degree_program(
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	code VARCHAR(16) UNIQUE,
	name VARCHAR(128)
);

DROP TABLE IF EXISTS curriculum;
CREATE TABLE curriculum(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    code varchar(64) NOT NULL,
    name varchar(256) NOT NULL,
    degreeProgramId int(11) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);


DROP TABLE IF EXISTS curriculum_course;
CREATE TABLE curriculum_course(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    courseId int(11) NOT NULL,
    curriculumId int(11) NOT NULL,
    year varchar(16) NOT NULL,
    semester varchar(16) NOT NULL,
    prerequisites varchar(512) DEFAULT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);

