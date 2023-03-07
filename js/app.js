"use strict";

function randomFun(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Employee(ID, fullName, department, level, image) {
    this.ID = ID;
    this.fullName = fullName;

    if (department == "Administration" || department == "Marketing" || department == "Development" || department == "Finance")
        this.department = department;
    else this.department = "invalid";

    if (level == "Junior" || level == "Mid-Senior" || level == "Senior")
        this.level = level;
    else this.level = "invalid";

    this.image = image;
    this.salary = "empty";
}

Employee.prototype.calculateSalary = function () {
    this.salary = (this.level == "Junior") ? randomFun(500, 1000) :
        (this.level == "Mid-Senior") ? randomFun(1000, 1500) :
            (this.level == "Senior") ? randomFun(1500, 2000) : 0;
    this.salary *= 0.925;
    this.salary=this.salary.toFixed(2);
}

Employee.prototype.render = function () {
    let table = document.getElementById("Employees");
    let newRow = table.insertRow(-1);
    let nameCell = newRow.insertCell(-1);
    let salaryCell = newRow.insertCell(-1);
    nameCell.innerHTML = this.fullName;
    salaryCell.innerHTML = this.salary;
}

let employees = [];
employees.push(new Employee(1000, 'Ghazi Samer', 'Administration', 'Senior'));
employees.push(new Employee(1001, 'Lana Ali', 'Finance', 'Senior'));
employees.push(new Employee(1002, 'Tamara Ayoub', 'Marketing', 'Senior'));
employees.push(new Employee(1003, 'Safi Walid', 'Administration', 'Mid-Senior'));
employees.push(new Employee(1004, 'Omar Zaid', 'Development', 'Senior'));
employees.push(new Employee(1005, 'Rana Saleh', 'Development', 'Junior'));
employees.push(new Employee(1006, 'Hadi Ahmad', 'Finance', 'Mid-Senior'));

for (let index = 0; index < employees.length; index++) {
    employees[index].calculateSalary();
    employees[index].render();
}