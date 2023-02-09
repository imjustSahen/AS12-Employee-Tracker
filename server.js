const inquirer = require("inquirer");
const utilQueries = require("./db/queries");
require("console.table");

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select an option below",
        name: "choice",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee",
          "Quit",
        ],
      },
    ])
    .then((choice) => {
      switch (choice.choice) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Department":
          createDepartment();
          break;
        case "Add Role":
          createRole();
          break;
        case "Add Employee":
          createEmployee();
          break;
        case "Update Employee":
          updateEmployeeRole();
          break;
        default:
        case "Quit":
          return quit();
      }
    })
    .catch((err) => {
      console.error(err);
      process.exit();
    });
}

function viewDepartments() {
  utilQueries
    .viewAllDepartments()
    .then(([rows]) => {
      let companyDepartments = rows;
      console.log("\n");
      console.table(companyDepartments);
    })
    .then(() => startApp());
}

function viewRoles() {
  utilQueries
    .viewAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startApp());
}

function viewEmployees() {
  utilQueries
    .viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startApp());
}

function createDepartment() {
  inquirer
    .prompt([
      {
        name: "department_name",
        message: "Name of the new department?",
      },
    ])
    .then((res) => {
      let name = res;
      utilQueries
        .createDepartment(name)
        .then(() => console.log(`\n Added ${name.department_name} to the company's departments! \n`))
        .then(() => startApp());
    });
}

function createRole() {
  utilQueries.viewAllDepartments().then(([rows]) => {
    let companyDepartments = rows;
    const departmentChoices = companyDepartments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: "title",
          message: "Role title?",
        },
        {
          name: "salary",
          message: "Salary?",
        },
        {
          name: "department_id",
          type: "list",
          message: "List of departments",
          choices: departmentChoices,
        },
      ])
      .then((role) => {
        utilQueries
          .createRole(role)
          .then(() => console.log(`\n Added ${role.title} to the company roles! \n`))
          .then(() => startApp());
      });
  });
}

function createEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "First name?",
      },
      {
        name: "last_name",
        message: "Last name?",
      },
    ])
    .then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      utilQueries.viewAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt({
            name: "role_id",
            type: "list",
            message: "Employee's role?",
            choices: roleChoices,
          })
          .then((res) => {
            let roleId = res.role_id;

            utilQueries.viewAllEmployees().then(([rows]) => {
              let companyEmployees = rows;
              const managerChoices = companyEmployees.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );

              managerChoices.unshift({ name: "None", value: null });

              inquirer
                .prompt({
                  name: "manager_id",
                  type: "list",
                  message: "Employee's manager?",
                  choices: managerChoices,
                })
                .then((res) => {
                  let employee = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: res.manager_id,
                    is_manager: 0
                  };

                  utilQueries.createEmployee(employee);
                })
                .then(() =>
                  console.log(`\n ${firstName} ${lastName} has been added! \n`)
                )
                .then(() => startApp());
            });
          });
      });
    });
}

function updateEmployeeRole() {
  utilQueries.viewAllEmployees().then(([rows]) => {
    let CompanyEmployees = rows;
    const employeeChoices = CompanyEmployees.map(
      ({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      })
    );

    inquirer
      .prompt([
        {
          name: "employeeId",
          type: "list",
          message: "Select an employee",
          choices: employeeChoices,
        },
      ])
      .then((res) => {
        let employeeId = res.employeeId;
        utilQueries.viewAllRoles().then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                name: "roleId",
                type: "list",
                message: "New role name?",
                choices: roleChoices,
              },
            ])
            .then((res) =>
              utilQueries.updateEmployeeRole(employeeId, res.roleId)
            )
            .then(() => console.log("The role has been updated"))
            .then(() => startApp());
        });
      });
  });
}

function quit() {
  process.exit();
}

startApp();
