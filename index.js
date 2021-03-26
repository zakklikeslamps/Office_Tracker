const connection = require('./config/connection');
const inquirer = require('inquirer');
require('console.table');


//throws error if connection to DB is unsuccessful
connection.connect((err) => {
    if(err) throw err;
    mainMenu();
});

//opens main menu
const mainMenu = () => {
    console.log("WELCOME TO THE OFFICE TRACKER!")
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
           'Add',
           'View',
           'Update',
           'Delete',
           'Quit'
        ]
    })
    //user choices
    .then(answer => {
        switch (answer.action) {
            case 'Add':
                addQuery();
                break;

            case 'View':
                viewQuery();
                break;

            case 'Update':
                updateQuery();
                break;

            case 'Delete':
                deleteQuery();
                break;
            
            case 'Quit':
                connection.end();
                break;

        }
    });
};

//'Add'
const addQuery = () => {
    inquirer.prompt({
        type: 'list', 
        message: 'Please select one of the following: ',
        choices: ['Department', 'Role', 'Employee', 'Quit'],
        name: 'toAdd'
    }).then(answer =>{

        if(answer.toAdd === 'Department') {
            addDept();
        }

        if(answer.toAdd === 'Role') {
            addRole();
        }

        if(answer.toAdd === 'Employee') {
            addEmpl();
        }

        if(answer.toAdd === 'Quit') {
            connection.end;
        }
    });
}

const addDept = () => {
    inqirer.prompt({
        type: 'input',
        message: 'Please enter a new Department.',
        name: 'newDept'
    }).then(answer => {
        const newDept = `INSERT INTO depts(name) Values (?)`;
        connection.query(newDept, answer.newDept, (err, res) => {
            if(err) throw err;
            console.table(res);

            viewDeptQuery();
        });
    });
};

const addRole = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter your new role.',
        name: 'newRole'
    }).then(answer => {
        const title = `INSERT INTO roles(title) VALUES (?)`;
        connection.query(title, answer.newTitle, (err, res) => {
            if(err) throw err;
            console.table(res);
        })
        inquirer.prompt({
            type: 'input',
            message: 'Please enter salary.',
            name: 'newSalary'
        }).then(answer => {
            const salary = `INSERT INTO roles(salary) VALUES (?)`;
            connection.query(salary, answer.newSalary, (err,res) => {
                if(err) throw err;
                console.table(res);
            })
            inquirer.prompt({
            type: 'input',
            message: 'Please enter Department ID.',
            name: 'newID'
            }).then(answer => {
                const newDeptId = `INSERT INTO roles(dept_id) VALUES (?)`;
                connection.query(newDeptId, answer.newID, (err, res) => {
                    if(err) throw err;
                    console.table(res);

                    viewRoleQuery();
                })
            })
        });
    });
}

const addEmpl = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter first name.',
        name: 'newFirstName'
    }).then(answer => {
        const firstName = `INSERT INTO empls(first_name) VALUES (?)`;
        connection.query(firstName, answer.newFirstName, (err, res) => {
            if(err) throw err;
            console.table(res);
        })
        inquirer.prompt({
            type: 'input',
            message: 'Please enter last name.',
            name: 'newLastName'
        }).then(answer => {
            const lastName = `INSERT INTO empls(last_name) VALUES (?)`;
            connection.query(lastName, answer.newLastName, (err, res) => {
                if(err) throw err;
                console.table(res);
            })
            inquirer.prompt({
                type: 'input',
                message: 'Please enter role ID.',
                name: 'newRoleID'
            }).then(answer => {
                const roleId = `INSERT INTO empls(role_id) VALUES (?)`;
                connection.query(roleId, answer.newRoleID, (err, res) => {
                    if(err) throw err;
                    console.table(res);
                })
                inquirer.prompt({
                    type: 'input',
                    message: 'Please enter manager ID.',
                    name: 'newManagerID'
                }).then(answer => {
                    const managerId = `INSERT INTO empls(manager_id) VALUES (?)`;
                    connection.query(managerId, answer.newManagerID, (err, res) => {
                        if(err) throw err;
                        console.table(res);
                    }) 
                    viewEmplSearch();
                })
            });
        });
    })
}

const viewQuery = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please select one of the following: ',
        choices: ['Department', 'Role', 'Employee', 'Quit'],
        name: 'toView'
    }).then((answer) => {

        if (answer.toView === 'Department') {
            viewDeptSearch();
        }

        if (answer.toView === 'Role') {
            viewRoleSearch();
        }

        if (answer.toView === 'Employee') {
            viewEmplSearch();
        }

        if (answer.toView === 'Quit') {
            connection.end();
        }
    })
}


const viewDeptSearch = () => {
    const deptSql = `SELECT dept.id AS id, dept.name AS dept FROM depts`;
    connection.query(deptSql, (err, res) => {
        if (err) throw err;
        console.table(res);

        viewQuery();
    });
};

const viewRoleSearch = () => {
    const roleSql = `SELECT role.id AS id, role.title AS title, role.salary AS salary, role.dept_id AS dept_id FROM roles`;
    connection.query(roleSql, (err, res) => {
        if (err) throw err;
        console.table(res);

        mainMenu();
    });
};

const viewEmplSearch = () => {
    const emplSql = `SELECT empls.id AS id, empls.first_name, empls.last_name, empls.role_id AS role_id, empls.manager_id AS manager_id FROM empls`;
    connection.query(emplSql, (err, res) => {
    if (err) throw err;
    console.table(res);

    mainMenu();
    });
};

const updateQuery = () => {
    inquirer.prompt({

        type: 'list', 
        message: 'Would you like to update an employee?',
        choices: ['Yes', 'No'],
        name: 'toUpdate'
    }).then((answer) => {

        if (answer.toUpdate === 'Yes') {
            connection.query(`SELECT * FROM empls`, (err, res) => {
                if (err) throw err;
                console.table(res);//'/n', ???
            });
            updateSql();
        }
        if (answer.toUpdate ==='No') {
            mainMenu();
        }
    });
}

const updateSql = () => {
    inquirer.prompt({
        type: 'input', 
        message: 'Enter employee ID.',
        name: 'sqlUpdate'
    }).then((answer) => {
        const emplUpdate = `UPDATE SET first_name = ?, last_name = ?, manager_id = ? WHERE id =?`;
        connection.query(emplUpdate, answer.id, (err, res) => {
            if (err) throw err;
            console.table(res);
        });
    });
};


const deleteQuery = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please select one of the following:',
        choices: ['Department', 'Role', 'Employee'],
        name: 'toDelete'
    }).then(answer => {
        if (answer.toDelete === 'Department') {
            delDept();
        }

        if (answer.toDelete === 'Role') {
            delRole();
        }

        if (answer.toDelete === 'Employee') {
            delEmpl();
        }

        if (answer.toDelete === 'Quit') {
            connection.end();
        }
    })

}

const delEmpl = () => {
    let emplSql = `SELECT * FROM empls`;
    connection.query(emplSql, (err, res) => {
        if (err) throw  err;
        let emplsArray = [];
        Response.forEach((empls) => {emplsArray.push(`${empls.first_name} ${empls.last_name} ${empls.role_id} ${empls.manager_id}`)});

        inquirer.prompt([
            {
                name: 'emplChoice',
                type: 'list',
                message: 'Which employee would you like to delete?',
                choices: emplsArray
            }
        ]).then((answer) => {
            let emplId; 

            res.forEach((empl) => {
                if (answer.emplChoice === `${empls.first_name} ${empls.last_name} ${empls.role_id} ${empls.manager_id}`)
                {
                    emplId = empl.id;
                }
            });

            let delEmplSql = `DELETE FROM empls WHERE empl.id = ?`;
            connection.query(delEmplSql, [emplId], (err, res) => {
                if (err) throw err;
                console.table(res);
            });
        });
    });
};

const delRole = () => {
    let roleSql = `SELECT * FROM roles`;
    connection.query(roleSql, (err, res) => {
        if (err) throw err;
        let roleArray = [];
        res.forEach((roles) => {
            roleArray.push(roles.title), (roles.salary), (roles.dept_id);
        });
        inquirer.prompt([
            {
                name: 'roleChoice',
                type: 'list',
                message: 'Please select the role you wish to remove.',
                choices: roleArray
            }
        ]).then((answer) => {
            let roleId;
            res.forEach((role) => {
                if (answer.roleChoice === (roles.title) || (roles.salary) || (roles.dept_id)) {
                    roleId = role.id;
                }
            });

            let delRoleSql = `DELETE FROM roles WHERE roles.id = ?`;
            connection.query(delRoleSql, [roleId], (err, res) => {
                if (err) throw err; 
                console.table(res);
            });
        });
    });
};


const delDept = () => {
    let deptSql = `SELECT dept.id, dept.name FROM depts`;
    connection.query(deptSql, (err, res) => {
        if (err) throw err;
        let deptArray = [];
        res.forEach((dept) => {
            { deptArray.push(dept.name); }
        })
        inquirer.prompt([
            {
                name: 'deptChoice',
                type: 'list',
                message: 'Please select the department you wish to remove.',
                choices: deptArray
            }
        ]).then((answer) => {
            let deptId;
            res.forEach((dept) => {
                if (answer.deptChoice === dept.name) {
                    deptId = dept.id;
                }
            });

            let delDeptSql = `DELETE FROM depts WHERE dept.id = ?`;
            connection.query(delDeptSql, [deptId], (err, res) => {
                if (err) throw err; 
                console.table(res);
            });
        });
    });
}
    