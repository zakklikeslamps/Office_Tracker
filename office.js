//dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
//connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'officeDB',
});

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
        choices: ['Departments', 'Roles', 'Associates', 'Quit'],
        name: 'toAdd'
    }).then(answer =>{

        if(answer.toAdd === 'Departments') {
            addDept();
        }

        if(answer.toAdd === 'Roles') {
            addRole();
        }

        if(answer.toAdd === 'Associates') {
            addAssc();
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
        const AND = `INSERT INTO department(name) Values (?)`;
        connection.query(AND, answer.newDept, (err, res) => {
            if(err) throw err;
            console.table(res);

            viewDeptQuery();
        });
    });
};

const addRole = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter your new role/title.',
        name: 'newRole'
    }).then(answer => {
        const title = `INSERT INTO roles(title) VALUES (?)`;
        connection.query(title, answer.newTitle, (err, res) => {
            if(err) throwerr;
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
                const newDeptId = `INSERT INTO roles(department_id) VALUES (?)`;
                connection.query(newDeptId, answer.newID, (err, res) => {
                    if(err) throw err;
                    console.table(res);

                    viewRoleQuery();
                })
            })
        });
    });
}

const addAssc = () => {
    inquirer.prompt({
        type: 'input',
        message: 'Please enter first name.',
        name: 'newFirstName'
    }).then(answer => {
        const firstName = `INSERT INTO associates(first_name) VALUES (?)`;
        connection.query(firstName, answer.newFirstName, (err, res) => {
            if(err) throw err;
            console.table(res);
        })
        inquirer.prompt({
            type: 'input',
            message: 'Please enter last name.',
            name: 'newLastName'
        }).then(answer => {
            const lastName = `INSERT INTO associates(last_name) VALUES (?)`;
            connection.query(lastName, answer.newLastName, (err, res) => {
                if(err) throw err;
                console.table(res);
            })
            inquirer.prompt({
                type: 'input',
                message: 'Please enter role ID.',
                name: 'newRoleID'
            }).then(answer => {
                const roleID = `INSERT INTO associates(roles_id) VALUES (?)`;
                connection.query(roleID, answer.newRoleID, (err, res) => {
                    if(err) throw err;
                    console.table(res);
                })
                inquirer.prompt({
                    type: 'input',
                    message: 'Please enter manager ID.',
                    name: 'newManagerId'
                }).then(answer => {
                    const managerID = `INSERT INTO associates(manager_id) VALUES (?)`;
                    connection.query(managerID, answer.newManagerId, (err, res) => {
                        if(err) throw err;
                        console.table(res);
                    }) 
                    viewAsscSearch();
                })
            });
        });
    })
}

const viewQuery = () => {
    inquirer.prompt({
        type: 'list',
        message: 'Please choose one of the following options: ',
        choices: ['Departments', 'Roles', 'Associates', 'Quit'],
        name: 'toView'
    }).then((answer) => {

        if (answer.toView === 'Departments') {
            viewDeptSearch();
        }

        if (answer.toView === 'Roles') {
            viewRoleSearch();
        }

        if (answer.toView === 'Associates') {
            viewAsscSearch();
        }

        if (answer.toView === 'Quit') {
            connection.end();
        }
    })
}


const viewDeptSearch = () => {
    const deptSql = `SELECT department.id AS id, department.name AS department FROM department`;
    connection.query(deptSql, (err, res) => {
        if (err) throw err;
        console.table(res);

        viewQuery();
    });
};

const viewRoleSearch = () => {
    const roleSql = `SELECT roles.id AS id, roles.title AS title, roles.salary AS salary, roles.department_id AS department_id FROM roles`;
    connection.query(roleSql, (err, res) => {
        if (err) throw err;
        console.table(res);

        mainMenu();
    });
};

const viewAsscSearch = () => {
    const asscSql = `SELECT associate.id AS id, associate.first_name, associate.last_name, associate.roles_id AS roles_id, aassociate.manager_id AS manager_id FROM associates`;
    connection.query(asscSql, (err, res) => {
    if (err) throw err;
    console.table(res);

    mainMenu();
    });
};

const updateQuery = () => {
    inquirer.prompt({

        type: 'list', 
        message: 'Would you like to update an associate?',
        choices: ['Yes', 'No'],
        name: 'toUpdte'
    }).then((answer) => {

        if (answer.toUpdate === 'Yes') {
            connection.query(`SELECT * FROM associates`, (err, res) => {
                if (err) throw err;
                console.table('/n', rest);
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
        message: 'Enter associate ID.',
        name: 'sqlUpdate'
    }).then((answer) => {
        const asscUpdate = `UPDATE SET first_name = ?, last_name = ?, manager_id = ? WHERE id =?`;
        connection.query(asscUpdate, answer.id, (err, res) => {
            if (err) throw err;
            console.table(res);
        });
    });
};


const deleteQuery