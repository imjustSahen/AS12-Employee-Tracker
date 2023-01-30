DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE company_departments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE company_roles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  salary INT UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL
  FOREIGN KEY (department_id)
  REFERENCES company_departments(id)
  ON DELETE SET NULL
);

CREATE TABLE company_employees (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES company_roles(id),
  manager_id INT UNSIGNED,
  FOREIGN KEY (manager_id)
  REFERENCES company_employees(id)
  ON DELETE SET NULL
);