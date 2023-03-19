"use strict";

let key = "employeesData";

function compare(a, b) {
    if (a.department > b.department)
        return 1;

    if (a.department < b.department)
        return -1;


    if (a.fullName > b.fullName)
        return 1;

    if (a.fullName < b.fullName)
        return -1;

    return 0;
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
}

function addTableRow(compartmentId, departmentType, numOfEmployees, averageSalary, salarySum) {
    let row = compartmentId.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = departmentType;

    cell = row.insertCell();
    cell.innerHTML = numOfEmployees;

    cell = row.insertCell();
    cell.innerHTML = averageSalary;

    cell = row.insertCell();
    cell.innerHTML = salarySum;
}

function genetareTable(allEmployees) {
    let numOfEmployees = 0, salarySum = 0, totalSalary = 0, totalEmployees = 0, departmentType = allEmployees[0].department;
    let tableBody = document.getElementById("tableBody"), tableFoot = document.getElementById("tableFoot");

    for (let index = 0; index < allEmployees.length; index++) {
        if (departmentType == allEmployees[index].department) {
            numOfEmployees++;
            salarySum += parseFloat(allEmployees[index].salary);
        }
        else {
            addTableRow(tableBody, departmentType, numOfEmployees, salarySum / numOfEmployees, salarySum);
            totalSalary += parseFloat(salarySum);
            totalEmployees += numOfEmployees;
            numOfEmployees = 1;
            salarySum = parseFloat(allEmployees[index].salary);
            departmentType = allEmployees[index].department;
        }
        if (index == allEmployees.length - 1) {
            addTableRow(tableBody, departmentType, numOfEmployees, salarySum / numOfEmployees, salarySum);
            totalSalary += parseFloat(salarySum);
            totalEmployees += parseFloat(numOfEmployees);
        }
    }
    addTableRow(tableFoot, "Summry", totalEmployees, totalSalary / totalEmployees, totalSalary);
}

window.onload = function () {
    let allEmployees = getData(key);
    allEmployees.sort(compare);
    genetareTable(allEmployees);
}

// localStorage.clear();