import React, {useEffect, useState} from "react";
import _ from 'lodash';
import {MAX_SALARY, MIN_SALARY} from "../config/employees_config";
import {useSelector} from "react-redux";
const SalaryStatistics = () => {
   const employees = useSelector(state => state.employees);
    let [interval,setInterval] = useState(1000);

    useEffect(
        () => {

           const intervalProm = window.prompt("Enter salaries interval", "1000");
           setInterval(+intervalProm)

        }, []
    );

        if (employees.length === 0) {
            return <div/>
        }



        const statistics = getStatistics();
    function getStatistics() {
        return employees.reduce((res, c) => {
            return {min: c.salary < res.min ? c.salary : res.min,
                max: c.salary > res.max ? c.salary : res.max,
                total: res.total + c.salary}
        }, {min: MAX_SALARY, max: MIN_SALARY, total:0})
    }

    function getIntervalItems(interval) {
        const objIntervalStatistics =
            _.countBy(employees, c => {
                return Math.floor(c.salary / interval);
            });
        let startInterval = +MIN_SALARY;
        return Object.values(objIntervalStatistics).map(v => {
            const nextInterval = startInterval + +interval;
            const key = `${startInterval}-${nextInterval}`;
            startInterval = nextInterval;
            return <li key={key}>{key}:{v}</li>
        })

    }
    return <div className="card">
        <div className="card-header">
            <h3>Salary statistics</h3>
        </div>
        <div className="card-body">
            <div >
                <label>minimal salary value: {statistics.min}</label><br/>
                <label>maximal salary value: {statistics.max}</label><br/>
                <label>total salary: {statistics.total}</label><br/>
                <ol>
                    {getIntervalItems(+interval)}
                </ol>
            </div>
        </div>
    </div>
};
export default SalaryStatistics;
