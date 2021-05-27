DROP DATABASE IF EXISTS office_db;
CREATE DATABASE office_db;

USE office_db;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (30) NOT NULL,

);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY,    
title VARCHAR (30) NOT NULL,
salary DECIMAL(10, 2) NOT NULL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
INDEX dep_ind (department_id),
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30)NOT NULL,
role_id INT NOT NULL, 
INDEX role_ind (role_id), 
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
manager_id INT,
INDEX man_ind (manager_id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

);

