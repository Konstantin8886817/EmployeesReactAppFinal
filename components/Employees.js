import * as React from "react";
import '../sstylesheets/Employees.css';
import _ from 'lodash';
import EmployeesTable from "./EmployeesTable";
import EmployeeForm from "./EmployeeForm";
import {useState} from "react";

import {useSelector} from "react-redux";

const Employees = (props) => {
    let employeesSwitch;
    let setEmployeesSwitch;
    [employeesSwitch, setEmployeesSwitch] = useState(0);
    const employees = useSelector(state => state.employees);
    const userData = useSelector(state => state.userData);
    function addEmployeeShow() {
        setEmployeesSwitch(2);
    }
    function addEmployee(employee) {

        const index = employees
            .findIndex(e => e.id === employee.id);
        if (index >= 0) {
            return false;
        }
        props.employeesService.addEmployee(employee)
            .then(() => {
                setEmployeesSwitch(0);
            }, () =>
            {alert(`employee with id ${employee.id} already exists`)});


        return true;
    }
    function removeEmployee(id) {
        _.remove(employees, e => e.id === id)  ;
        props.employeesService.deleteEmployee(id)
            .then(() => {
            })

    }
    switch(employeesSwitch){
        case 0: return <div className="employees">
            <EmployeesTable employees={employees}
                            removeFn={removeEmployee} />
            {userData.isAdmin ? <i style={{cursor: 'pointer'}}
               className="fa fa-plus-square fa-3x"
               onClick={addEmployeeShow}/> : null}
        </div>;

        case 2: return <EmployeeForm addEmployeeFn={addEmployee}/>
    }
};

export default Employees;
