DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- Need to add a cascade on delete to include employees/roles
CREATE TABLE company_departments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL,
  manager_id INT UNSIGNED NOT NULL
);

-- Should company role id be manually added?
-- Need to add a cascade on delete to include employees
CREATE TABLE company_roles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  salary INT UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  -- manager_role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (department_id) REFERENCES company_departments(id)
  -- FOREIGN KEY (manager_role_id) REFERENCES company_departments(manager_id)
);

-- Only one manager allowed per department?
CREATE TABLE company_employees (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX manager_id INT UNSIGNED,
  FOREIGN KEY (role_id) REFERENCES company_roles(id),
  CONSTRAINT fk_company_departments FOREIGN KEY (manager_id) REFERENCES company_departments(manager_id)
);