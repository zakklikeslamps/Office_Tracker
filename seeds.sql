USE office_db;

INSERT INTO depts (name)
VALUES ("Sales"), ("Product Dev."), ("Management"), ("Legal");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Office Manager", 80000.00, 1), ("Sales Manager", 70000.00, 2), ("Dev. Team Lead", 75000.00, 3), ("Dev. Team", 70000.00, 3), ("Legal Team", 80000.00, 4);

INSERT INTO empls (first_name, last_name, role_id, manager_id)
VALUES ("Darryl", "Wilcox", 3, 2), ("Lou", "Nevicati", 2, 1), ("Kyle", "Kinslow", 2, 2), ("Donald", "Kinslow", 3, 1), ("Konnor", "Sinclair", 3, null), ("Erica", "Mo", 4, null), ("Zakk", "Haug", 1, null);