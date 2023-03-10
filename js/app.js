"use strict";

let employees = [];
let form = document.getElementById('newEmployee')
let content;
let Administration = document.getElementById("administrationEmployees");
let Marketing = document.getElementById("marketingEmployees");
let Development = document.getElementById("developmentEmployees");
let Finance = document.getElementById("financeEmployees");
let collection = document.getElementsByClassName("collapsible");


for (let index = 0; index < collection.length; index++) {

    collection[index].addEventListener("click", function () {
        this.classList.toggle("active");
        content = this.nextElementSibling;

        if (content.style.display === "flex") {
            content.style.display = "none";
        } else {
            content.style.display = "flex";
        }

    });
}

function displayRadioValue(name) {
    let ele = document.getElementsByName(name);

    for (let index = 0; index < ele.length; index++) {
        if (ele[index].checked) {
            return ele[index].id;
        }
    }
}
form.addEventListener("submit", submitHandler)

function submitHandler(event) {
    event.preventDefault();
    console.log(event)
    let newName = event.target.fname.value;
    let newDepartment = displayRadioValue('Department');
    let newLevel = displayRadioValue('Level');
    let newURL = event.target.URL.value;
    employees.push(new Employee(new employeeStruct(newName, newDepartment, newLevel, newURL)));
    employees[employees.length - 1].generateData();
    employees[employees.length - 1].render();
}

function randomFun(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//employees struct
function employeeStruct(fullName, department, level, image) {
    this.fullName = fullName;
    console.log(department, level);
    if (department == "Administration" || department == "Marketing" || department == "Development" || department == "Finance")
        this.department = department;
    else this.department = "invalid";

    if (level == "Junior" || level == "Mid-Senior" || level == "Senior")
        this.level = level;
    else this.level = "invalid";

    this.image = image;
}
//employees class

function Employee(employee) {
    this.fullName = employee.fullName;
    this.department = employee.department;
    this.level = employee.level;
    this.image = employee.image;
}

Employee.prototype.IDMap = new Map();

Employee.prototype.calculateSalary = function () {
    this.salary = (this.level == "Junior") ? randomFun(500, 1000) :
        (this.level == "Mid-Senior") ? randomFun(1000, 1500) :
            (this.level == "Senior") ? randomFun(1500, 2000) : 0;
    this.salary *= 0.925;
    this.salary = this.salary.toFixed(2);
}

Employee.prototype.generateID = function () {
    let min = 1000, max = 9999;
    while (1) {
        let IDTest = randomFun(min, max);
        if (!Employee.prototype.IDMap.has(IDTest)) {
            Employee.prototype.IDMap.set(IDTest, 1);
            this.ID = IDTest;
            return;
        }
    }
}

Employee.prototype.generateData = function () {
    this.calculateSalary();
    this.generateID();
}

Employee.prototype.findDepartment = function () {
    return (this.department == "Administration") ? Administration :
        (this.department == "Marketing") ? Marketing :
            (this.department == "Development") ? Development :
                Finance;
}

Employee.prototype.render = function () {
    let employeeCard = document.createElement("div")
    let employeeSection = this.findDepartment();

    let imgElement = document.createElement('img');
    imgElement.src = this.image;
    imgElement.alt = "employee image";
    let employeeInfo = document.createTextNode(` Name:${this.fullName}-ID:${this.ID}-Department:${this.department}-Level:${this.level}-Salary:${this.salary}`);

    employeeCard.appendChild(imgElement);
    employeeCard.appendChild(employeeInfo);
    employeeCard.classList.add("employeeCard");
    employeeSection.appendChild(employeeCard);

}

