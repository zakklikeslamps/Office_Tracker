
const connection = require("./config/connection");
const inquirer = require("inquirer");
require("console.table");

//throws error if connection to DB is unsuccessful
connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});

//opens main menu
const mainMenu = () => {
  console.log("WELCOME TO THE OFFICE TRACKER!");
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add", "View", "Update", "Delete", "Quit"],
    })

    //user choices
    .then((answer) => {
      switch (answer.action) {
        case "Add":
          addQuery();
          break;

        case "View":
          viewQuery();
          break;

        case "Update":
          updateQuery();
          break;

        case "Delete":
          deleteQuery();
          break;

        case "Quit":
          connection.end();
          break;
      }
    });
};

//'Add'
const addQuery = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select one of the following: ",
      choices: ["Department", "Role", "Employee", "Quit"],
      name: "toAdd",
    })
    .then((answer) => {
      if (answer.toAdd === "Department") {
        addDepartment();
      }

      if (answer.toAdd === "Role") {
        addRole();
      }

      if (answer.toAdd === "Employee") {
        addEmployee();
      }

      if (answer.toAdd === "Quit") {
        mainMenu();
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Please enter a new Department.",
      name: "newDepartment",
    })
    .then((answer) => {
      const newDepartment = `INSERT INTO department(name) Values (?)`;
      connection.query(newDepartment, answer.newDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);

        inquirer
          .prompt({
            type: "list",
            choices: [
              "Add another department",
              "Exit.",
            ],
            message: "What do you want to do next?",
            name: "choice",
          })
          .then(({ choice }) => {
            if (choice === "Add another department") {
              addDepartment();
            } else {
              addQuery();
            }
          });
      });
    });
};

//////ISSUE HERE
const addRole = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Please enter your new role.",
      name: "newRole",
    },

    {
      type: "input",
      message: "Please enter salary.",
      name: "newSalary",
    },

    {
      type: "input",
      message: "Please enter Department ID.",
      name: "newID",
    })
    //removed prompt ^
    .then((answer) => {
      const title = `INSERT INTO role VALUES ?`;
      connection.query(title, answer.newTitle, (err, res) => {
        if (err) throw err;
        console.table(res);
      });

      //removed prompt ^
      inquirer
        .then((answer) => {
          const salary = `INSERT INTO role VALUES ?`;
          connection.query(salary, answer.newSalary, (err, res) => {
            if (err) throw err;
            console.table(res);
          });

          //removed prompt ^
          inquirer
            .then((answer) => {
              const newDepartmentId = `INSERT INTO role VALUES ?`;
              connection.query(newDepartmentId, answer.newID, (err, res) => {
                if (err) throw err;
                console.table(res);

                viewRoleQuery();
              });
            });
        });
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter first name.",
        name: "first_name",
      },
      {
        type: "input",
        message: "Please enter last name.",
        name: "last_name",
      },
      {
        type: "input",
        message: "Please enter role ID.",
        name: "role_id",
      },
      {
        type: "input",
        message: "Please enter manager ID.",
        name: "manager_id",
      },
    ])
    .then((answer) => {
      console.log(answer);
      const newEmployee = `INSERT INTO employee SET ?`;
      connection.query(newEmployee, answer, (err, res) => {
        if (err) throw err;
        console.table(res);

        inquirer
          .prompt({
            type: "list",
            choices: [
              "Add another employee",
              "Exit.",
            ],
            message: "What do you want to do next?",
            name: "choice",
          })
          .then(({ choice }) => {
            if (choice === "Add another employee") {
              addDepartment();
            } else {
              addQuery();
            }
          });

      });

    });
  
};

//'View'
const viewQuery = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select one of the following: ",
      choices: ["Department", "Role", "Employee", "Quit"],
      name: "toView",
    })
    .then((answer) => {
      if (answer.toView === "Department") {
        viewDepartmentSearch();
      }

      if (answer.toView === "Role") {
        viewRoleSearch();
      }

      if (answer.toView === "Employee") {
        viewEmployeeSearch();
      }

      if (answer.toView === "Quit") {
        mainMenu();
      }
    });
};

const viewDepartmentSearch = () => {
  const departmentSql = `SELECT department.id AS id, department.name AS department FROM department`;
  connection.query(departmentSql, (err, res) => {
    if (err) throw err;
    console.table(res);

    viewQuery();
  });
};

const viewRoleSearch = () => {
  const roleSql = `SELECT role.id AS id, role.title AS title, role.salary AS salary, role.department_id AS department_id FROM role`;
  connection.query(roleSql, (err, res) => {
    if (err) throw err;
    console.table(res);

    viewQuery();
  });
};

const viewEmployeeSearch = () => {
  const employeeSql = `SELECT employee.id AS id, employee.first_name, employee.last_name, employee.role_id AS role_id, employee.manager_id AS manager_id FROM employee`;
  connection.query(employeeSql, (err, res) => {
    if (err) throw err;
    console.table(res);

    viewQuery();
  });
};

//'Update'
const updateQuery = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Would you like to update an employee?",
      choices: ["Yes", "No"],
      name: "toUpdate",
    })
    .then((answer) => {
      if (answer.toUpdate === "Yes") {
        connection.query(`SELECT * FROM employee`, (err, res) => {
          
          if (err) throw err;
          console.table(res); //'/n', ???
        });
        updateSql();
      }
      if (answer.toUpdate === "No") {
        mainMenu();
      }
    });
};

//////ISSUE HERE
const updateSql = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Enter employee's first name'.",
      name: "sqlUpdate",
    },

    {
      type: "input",
      message: "Enter employee's last name'.",
      name: "sqlUpdate",
    },
    {
      type: "input",
      message: "Enter employee credentials'.",
      name: "sqlUpdate",
    })
    .then((answer) => {
      const employeeUpdate = `UPDATE SET WHERE id = ?`;
      connection.query(employeeUpdate, answer.id, (err, res) => {
        if (err) throw err;
        console.table(res);
      });
    });
};

//'Delete'
const deleteQuery = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Please select one of the following:",
      choices: ["Department", "Role", "Employee"],
      name: "toDelete",
    })
    .then((answer) => {
      if (answer.toDelete === "Department") {
        delDepartment();
      }

      if (answer.toDelete === "Role") {
        delRole();
      }

      if (answer.toDelete === "Employee") {
        delEmployee();
      }

      if (answer.toDelete === "Quit") {
        mainMenu();
      }
    });
};

//////ISSUE HERE
const delEmployee = () => {
  let employeeSql = `SELECT * FROM employee`;
  connection.query(employeeSql, (err, res) => {
    if (err) throw err;
    let employeeArray = [];
    Response.forEach((employee) => {
      employeeArray.push(
        `${employee.first_name} ${employee.last_name} ${employee.role_id} ${employee.manager_id}`
      );
    });

    inquirer
      .prompt([
        {
          name: "employeeChoice",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: employeeArray,
        },
      ])
      .then((answer) => {
        let employeeId;

        res.forEach((employee) => {
          if (
            answer.employeeChoice ===
            `${employee.first_name} ${employee.last_name} ${employee.role_id} ${employee.manager_id}`
          ) {
            employeeId = employee.id;
          }
        });

        let delEmployeeSql = `DELETE FROM employee WHERE employee.id = ?`;
        connection.query(delEmployeeSql, [employeeId], (err, res) => {
          if (err) throw err;
          console.table(res);

          viewEmployeeSearch();
        });
      });
  });
};

const delRole = () => {
  let roleSql = `SELECT * FROM role`;
  connection.query(roleSql, (err, res) => {
    if (err) throw err;
    let roleArray = [];
    res.forEach((role) => {
      roleArray.push(role.title), role.salary, role.dept_id;
    });
    inquirer
      .prompt([
        {
          name: "roleChoice",
          type: "list",
          message: "Please select the role you wish to remove.",
          choices: roleArray,
        },
      ])
      .then((answer) => {
        let roleId;
        res.forEach((role) => {
          if (
            answer.roleChoice === role.title ||
            role.salary ||
            role.department_id
          ) {
            roleId = role.id;
          }
        });

        let delRoleSql = `DELETE FROM role WHERE role.id = ?`;
        connection.query(delRoleSql, [roleId], (err, res) => {
          if (err) throw err;
          console.table(res);
        });
      });
  });
};

const delDepartment = () => {
  let departmentSql = `SELECT department.id, department.name FROM department`;
  connection.query(departmentSql, (err, res) => {
    if (err) throw err;
    let departmentArray = [];
    res.forEach((department) => {
      {
        departmentArray.push(department.name);
      }
    });
    inquirer
      .prompt([
        {
          name: "deptChoice",
          type: "list",
          message: "Please select the department you wish to remove.",
          choices: departmentArray,
        },
      ])
      .then((answer) => {
        let departmentId;
        res.forEach((department) => {
          if (answer.departmentChoice === department.name) {
            departmentId = department.id;
          }
        });

        let delDepartmentSql = `DELETE FROM department WHERE department.id = ?`;
        connection.query(delDepartmentSql, [departmentId], (err, res) => {
          if (err) throw err;
          console.table(res);
        });
      });
  });
};
