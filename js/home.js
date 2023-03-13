"use strict";

let employee;
let form = document.getElementById('newEmployee')
let content;
let Administration = document.getElementById("administrationEmployees");
let Marketing = document.getElementById("marketingEmployees");
let Development = document.getElementById("developmentEmployees");
let Finance = document.getElementById("financeEmployees");
let collection = document.getElementsByClassName("collapsible");
let key = "employeesData";

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

function getRadioValue(name) {
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
    let newName = event.target.fname.value;
    let newDepartment = getRadioValue('Department');
    let newLevel = getRadioValue('Level');
    let newURL = event.target.URL.value;
    employee=new Employee(new employeeStruct(newName, newDepartment, newLevel, newURL));
    employee.generateData();
    employee.render();
    saveData(employee);
}

function randomFun(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function saveData(obj) {
    if (JSON.parse(localStorage.getItem(key) || "[]") == null) {
        let data=[];
        data.push(obj);
        localStorage.setItem(key, JSON.stringify(data));
        return;
    }
    let data = JSON.parse(localStorage.getItem(key) || "[]");
    data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

window.onload = function () {
    let allEmployees = getData(key);
    if(allEmployees==null)
    return ;
    for (let index = 0; index < allEmployees.length; index++) {
        let employeeInstance = new Employee(allEmployees[index]);
        employeeInstance.render();
    }
}

//employees struct
function employeeStruct(fullName, department, level, image) {
    this.fullName = fullName;
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
    this.salary = employee.salary;
    this.ID = employee.ID;
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
                (this.department == "Finance") ? Finance : null;
}

Employee.prototype.render = function () {
    let employeeCard = document.createElement("div");
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

// localStorage.clear();