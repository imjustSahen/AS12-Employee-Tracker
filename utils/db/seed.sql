USE company_db

INSERT INTO company_departments (department_name, manager_role_id)
VALUES ('Sales', 1),
       ('Engineering', 2),
       ('Accounting', 3),
       ('Marketing', 4),
       ('Human Resources', 5);

INSERT INTO company_roles (role_title, salary, department_id, manager_role_id) 
VALUES ('Outside Sales', 50000, 1, 1),
        ('Engineer', 100000, 2, 2),
        ('Accountant', 400000, 3, 3),
        ('Designer', 30000, 4, 4),
        ('Administration', 20000, 5, 5);

INSERT INTO company_employees (first_name, last_name, role_id, manager_id)
 VALUES ('Ron', 'Paul', 1, 1),
        ('Ron', 'Paul', 2, 2),
        ('Ron', 'Paul', 4, 3),
        ('Ron', 'Paul', 3, 4),
        ('Ron', 'Paul', 5, 5);
        -- ('Ron', 'Paul', 2, 0),
        -- ('Ron', 'Paul', 3, 0),
        -- ('Ron', 'Paul', 1, 0),
        -- ('Ron', 'Paul', 1, 0);
