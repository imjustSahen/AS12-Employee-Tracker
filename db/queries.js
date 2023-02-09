const connection = require("./connection");

class dbQuery {
  constructor(connection) {
    this.connection = connection;
  }

  // GET/Read queries
  viewAllDepartments() {
    return this.connection.promise().query("SELECT * FROM company_departments");
  }

  viewAllRoles() {
    return this.connection.promise().query(
      "SELECT id, title, salary, department_id AS role FROM company_roles"
    );
  }

  viewAllEmployees() {
    return this.connection.promise().query("SELECT * FROM company_employees");
  }

  // POST/Create queries
  createDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO company_departments SET ?",
      department
    );
  }

  createRole(newRole) {
    return this.connection.promise().query("INSERT INTO company_roles SET ?", newRole);
  }

  createEmployee(employee) {
    return this.connection.promise().query(
      "INSERT INTO company_employees SET ?",
      employee
    );
  }

  // PUT/Update queries
  updateEmployee() {
    return this.connection.promise().query(
      "UPDATE company_employees SET role_id = role_id WHERE first_name = name"
    );
  }

  updateEmployeeRole(employeeId, newRoleId) {
    console.log("inside query");
    return this.connection.promise().query(
      "UPDATE company_employees SET role_id = ? WHERE id = ?",
      [newRoleId, employeeId]
    );
  }

  // DELETE/Delete queries
  deleteDepartment(id) {
    return this.connection.promise().query(
      "DELETE FROM company_departments WHERE id = ?",
      id
    );
  }

  deleteRole(id) {
    return this.connection.promise().query("DELETE FROM company_roles WHERE id = ?", id);
  }

  deleteEmployee(id) {
    return this.connection.promise().query(
      "DELETE FROM company_employees WHERE id = ?",
      id
    );
  }
}

module.exports = new dbQuery(connection);
