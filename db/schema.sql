DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- Need to add a cascade on delete to include employees/roles
CREATE TABLE company_departments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Should company role id be manually added?
-- Need to add a cascade on delete to include employees
CREATE TABLE company_roles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INT UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_company_department FOREIGN KEY (department_id) REFERENCES company_departments(id) ON DELETE CASCADE
);

-- Only one manager allowed per department?
CREATE TABLE company_employees (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED,
  CONSTRAINT fk_company_role FOREIGN KEY (role_id) REFERENCES company_roles(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  CONSTRAINT fk_manager_role FOREIGN KEY (manager_id) REFERENCES company_employees(id),
  is_manager BOOLEAN NOT NULL
);