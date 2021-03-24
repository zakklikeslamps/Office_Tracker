DROP DATABASE IF EXISTS officeDB;
CREATE DATABASE officeDB;

USE officeDB;

CREATE TABLE deptartment (
id INT AUTO_INCREMENT,
department_name VARCHAR (30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT AUTO_INCREMENT,    
title VARCHAR (30) NOT NULL,
salary DECIMAL(10, 2) NOT NULL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE associates (
id INT AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT, 
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES (role_id)
);

