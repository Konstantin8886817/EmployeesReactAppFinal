import React, {useEffect, useState} from 'react';
import {DIGITS_ID, GENDERS, MAX_SALARY, MIN_SALARY, NAME_MIN_LENGTH, TITLES} from "../config/employees_config";
import {getErrorMessage, getInputElement, getRadioButtonElement, getSelectElement} from "../util/input_elements";
const EmployeeForm = (props) => {
    const [employee, setEmployee] = useState({
        id: 0,
        emailAddress: '',
        name: '',
        gender: '',
        salary: 0,
        title: TITLES[0]
    })

    const[error, setError] = useState({})

    const[isInvalid, setIsInvalid] = useState(true);

    function submit(event) {
        event.preventDefault();

        if (!props.addEmployeeFn(employee)) {
            error.errorId = `Employee ${employee.id} already exists`;

        }
        setEmployee({...employee});
    }
useEffect(() => {
    setError(error);
    setIsInvalid(!validate());
},[employee])


    function handlerId(event) {
        const id = event.target.value;
        error.errorId = '';

        if (id.length !== DIGITS_ID) {
            error.errorId = 'Number of ID digits should be '
                + DIGITS_ID;
        } else if(+id < 0) {
            error.errorId = 'id can\'t be negative number';
        } else if(id.indexOf(".") >= 0){
            error.errorId = 'id can\'t be fraction number';
        } else {
            employee.id = id;
        }
        setEmployee({...employee})


    }
    function handlerName(event) {
        const name = event.target.value;
        error.errorName = '';
        if (name.length < NAME_MIN_LENGTH) {
            error.errorName = 'Minimal name length should be '
                + NAME_MIN_LENGTH
        } else {
            employee.name = name;
            fillEmployeeAddress();
        }
        setEmployee({...employee});

    }
    function handlerNonValidated(event) {


       employee[event.target.name] = event.target.value;

        setEmployee({...employee});
    }
    function handlerGender(event) {
        event.preventDefault();
        employee.gender = event.target.value;
        event.target.checked = true;
        setEmployee({...employee});
    }
    function handlerSalary(event) {
        const salary = +event.target.value;
        setIsInvalid(false);
       error.errorSalary = ''
        if (salary < MIN_SALARY || salary > MAX_SALARY) {
            error.errorSalary =
                `salary should be in rang [${MIN_SALARY}-${MAX_SALARY}]`;
        } else {
            employee.salary = salary;
        }
       setEmployee({...employee})

    }
    function fillEmployeeAddress() {
        if (employee.id && employee.name) {
            if (!employee.emailAddress) {
                employee.emailAddress = '@';
            }
            const emailAddressFirstPart =
                employee.name +
                employee.id.substr(0, 3);
            const index = employee.emailAddress.indexOf("@");
            const emailAddressSecondPart =
                employee.emailAddress.substr(index);
            employee.emailAddress = emailAddressFirstPart +
                emailAddressSecondPart;
            setEmployee({...employee})
        }
    }
    function validate() {
        const res =  notErrors() && allFields();
        return res;
    }
    const genderRadioButtons = () => {
        return GENDERS.map(
            g => getRadioButtonElement('gender',
                handlerNonValidated, g)
        )
    }

    function notErrors() {
        return Object.values(error)
            .reduce((res, field) => {
                return res && !field
            } , true)
    }
    function allFields() {
        return Object.values(employee)
            .reduce((res, field) => {
                return res && field !== '' && field !== 0
            } , true)
    }
    return <div className="card">
        <div className="card-header">
            <h2>Employee Data Form</h2>
        </div>
        <div className="card-body">
            <form onSubmit={submit}>
                {getInputElement('number',
                    'id', 'Enter Employee ID',
                    handlerId)}
                {getErrorMessage(error.errorId)}

                {getInputElement('text',
                    'name', 'Enter Employee Name',
                    handlerName)}
                {getErrorMessage(error.errorName)}
                {getInputElement('email',
                    'emailAddress', 'Enter email address',
                    handlerNonValidated, employee.emailAddress)}
                {getRadioButtonElement('gender',handlerGender, 'male')}
                {getRadioButtonElement('gender',handlerGender, 'female')}
                {getInputElement('number', 'salary',
                    'Enter Salary', handlerSalary)}
                {getErrorMessage(error.errorSalary)}
                {getSelectElement('title', handlerNonValidated,
                    'Select Title', TITLES)}
                <button type="submit" disabled={isInvalid}>Add Employee</button>

            </form>
        </div>
    </div>
}

export default  EmployeeForm ;
