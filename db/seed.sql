USE company_db

INSERT INTO company_departments (department_name)
VALUES ('Admin'),
       ('Marketing'),
       ('Accounting');

INSERT INTO company_roles (title, salary, department_id) 
VALUES ("CEO", 125000, 1),
        ("Human Resources", 80000, 1),
        ("Administrative Intern", 35000, 1),
        ("Graphic Designer", 60000, 2),
        ("Graphic Design Intern", 35000, 2),
        ("Ad Account Manager", 45000, 2),
        ("Personal Assistant", 35000, 2),
        ("Print Media Tech", 42000, 2),
        ("Content Creator", 40000, 2),
        ("Payroll Accountant", 70000, 3),
        ("Billables", 70000, 3),
        ("Accounting Assistant", 50000, 3),
        ("Tax Accountant", 80000, 3);

INSERT INTO company_employees (first_name, last_name, role_id, manager_id, is_manager)
 VALUES ("Jon", "Snow", 1, null, 1),
        ("Arya", "Stark", 2, 1, 1),
        ("Brienne", "Tarth", 3, 2, 0),
        ("Bran", "Stark", 4, 1, 1),
        ("Davos", "Seaworth", 5, 4, 1),
        ("Eddard", "Stark", 6, 5, 0),
        ("Podrick", "Payne", 7, 1, 1),
        ("Samwell", "Tarly", 8, 7, 1),
        ("Sansa", "Stark", 9, 8, 0),
        ("Tyrion", "Lanaster", 10, 1, 0),
        ("Theon", "Greyjoy", 11, 1, 0),
        ("Jaime", "Lanister", 12, 1, 1),
        ("Jaqen", "H'ghar", 13, 12, 0);
