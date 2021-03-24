const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'officeDB',
});

//throws error if connection to DB is unsuccessful
connection.connect((err) => {
    if(err) throw(err);
    mainMenu();
});

const mainMenu = () => {
    console.log("WELCOME TO THE OFFICE TRACKER!")
    inquirer.prompt({
        name: 'actions',
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



