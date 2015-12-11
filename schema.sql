DROP TABLE IF EXISTS user;
CREATE TABLE user(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    username varchar(256) NOT NULL,
    password varchar(256) NOT NULL,
    emailAddress varchar(256) NOT NULL,
    profilePicture varchar(512),
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE(username)
);


DROP TABLE IF EXISTS role;
CREATE TABLE role(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    userId int(11) NOT NULL,
    role varchar(32) NOT NULL,
    unitLevel varchar(16) NOT NULL,
    parentUnitLevel varchar(16),
    status varchar(16) DEFAULT 'PENDING',
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE(userId, role, unitLevel)
);


DROP TABLE IF EXISTS __login;
CREATE TABLE __login (
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    userId int(11),
    sessionToken varchar(64) NOT NULL,
    ipAddress varchar(64) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    expiration timestamp NOT NULL,
    UNIQUE(userId, sessionToken)
);


DROP TABLE IF EXISTS __log;
CREATE TABLE __log(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    userId int(11), -- actor
    action varchar(256) NOT NULL,
    result TEXT NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);


DROP TABLE IF EXISTS unit;
CREATE TABLE unit(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    code varchar(16) NOT NULL,
    name varchar(128) NOT NULL,
    parentUnitId int(11),
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE(code)
);


DROP TABLE IF EXISTS degree_program;
CREATE TABLE degree_program(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    code varchar(16) NOT NULL,
    name varchar(256) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE(code)
);


DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    _id varchar(11) PRIMARY KEY,
    firstName varchar(256) NOT NULL,
    middleName varchar(256),
    lastName varchar(256) NOT NULL,
    unitId int(11) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);


DROP TABLE IF EXISTS course;
CREATE TABLE course(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    code varchar(16) NOT NULL,
    name varchar(256) NOT NULL,
    units tinyint(2),
    semesterOffered varchar(3),
    unitId int(11),
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE(code)
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


DROP TABLE IF EXISTS student;
CREATE TABLE student(
    _id varchar(10) NOT NULL,
    firstName varchar(256) NOT NULL,
    middleName varchar(256),
    lastName varchar(256) NOT NULL,
    curriculumId int(11) NOT NULL,
    allowedUnits tinyint(2) DEFAULT 0,
    sex char NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    PRIMARY KEY(_id)
);


DROP TABLE IF EXISTS student_adviser;
CREATE TABLE student_adviser(
    _id int(11) NOT NULL AUTO_INCREMENT,
    studentId varchar(10) NOT NULL,
    registrationAdviser varchar(256) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    PRIMARY KEY(_id)
);

DROP TABLE IF EXISTS room;
CREATE TABLE room(
    _id int(11) NOT NULL AUTO_INCREMENT,
    room varchar(256) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    PRIMARY KEY(_id)
);


DROP TABLE IF EXISTS section;
CREATE TABLE section(
    _id int(11) NOT NULL AUTO_INCREMENT,
    courseId int(11) NOT NULL,
    name varchar(16) NOT NULL,
    numberOfStudents tinyint(3) NOT NULL,
    daysLaboratory varchar(8),
    daysLecture varchar(8),
    daysRecitation varchar(8),
    timeLaboratory varchar(32),
    timeLecture varchar(32),
    timeRecitation varchar(32),
    timeLaboratoryBin bigint(20),
    timeLectureBin bigint(20),
    timeRecitationBin bigint(20),
    roomLaboratory varchar(32),
    roomLecture varchar(32),
    roomRecitation varchar(32),
    laboratoryInstructor int(11),
    lectureInstructor int(11),
    recitationInstructor int(11),
    daysLaboratory2 varchar(8),
    daysLecture2 varchar(8),
    daysRecitation2 varchar(8),
    timeLaboratory2 varchar(32),
    timeLecture2 varchar(32),
    timeRecitation2 varchar(32),
    timeLaboratoryBin2 bigint(20),
    timeLectureBin2 bigint(20),
    timeRecitationBin2 bigint(20),
    roomLaboratory2 varchar(32),
    roomLecture2 varchar(32),
    roomRecitation2 varchar(32),
    status varchar(16) DEFAULT 'OK',
    showInstructor varchar(16) NOT NULL DEFAULT 'NONE',
    unitId int(11) NOT NULL,
    year varchar(8) NOT NULL,
    semester varchar(16) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    PRIMARY KEY(_id)
);


DROP TABLE IF EXISTS recommended_course;
CREATE TABLE recommended_course(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    courseId int(11) NOT NULL,
    studentId varchar(10) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE (courseId, studentId)
);


DROP TABLE IF EXISTS grade;
CREATE TABLE grade(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    studentId varchar(10) NOT NULL,
    sectionId int(11) NOT NULL,
    grade varchar(16) NOT NULL,
    remarks varchar(256),
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp,
    UNIQUE(studentId, sectionId)
);


DROP TABLE IF EXISTS slot;
CREATE TABLE slot(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    status varchar(16) DEFAULT 'FREE',
    sectionId int(11) DEFAULT NULL,
    studentId varchar(10) DEFAULT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);


DROP TABLE IF EXISTS announcement;
CREATE TABLE announcement (
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    userId int(11),
    title varchar(512) NOT NULL,
    description text NOT NULL,
    datePosted date NOT NULL,
    expiryDate date NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);


DROP TABLE IF EXISTS waitlist;
CREATE TABLE waitlist (
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    sectionId int(11) NOT NULL,
    studentId varchar(10) NOT NULL,
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);


DROP TABLE IF EXISTS plan_of_study;
CREATE TABLE plan_of_study(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    courseId int(11) NOT NULL,
    curriculumId varchar(10) NOT NULL,
    studentId varchar(10) NOT NULL,
    isApproved varchar(10) DEFAULT 'PENDING',
    previousCourseId int(11),
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);

DROP TABLE IF EXISTS tcg;
CREATE TABLE tcg(
    _id int(11) AUTO_INCREMENT PRIMARY KEY,
    studentId varchar(10) NOT NULL,
    startYear varchar(8) NOT NULL,
    startSemester varchar(16) NOT NULL,
    endYear varchar(8) NOT NULL,
    endSemester varchar(16) NOT NULL,
    isApproved varchar(10) DEFAULT 'PENDING',
    _created timestamp DEFAULT CURRENT_TIMESTAMP,
    _recStatus varchar(8) DEFAULT 'ACTIVE',
    _updated timestamp
);
