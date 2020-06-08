import React, {useState} from 'react';
import {useSelector} from "react-redux";
import useColumnsMedia from "../util/mediaHook";
import columnsMediaObject from "../config/columns-media-config";
import Details from "./Details";
import columnsContent from "../config/table-config";

export default function EmployeesTable(props) {
const employees = props.employees;
const userData = useSelector(state => state.userData);
const columns = useColumnsMedia(columnsMediaObject);
const columnValues = Object.values(columnsMediaObject);
const maxColumns = Math.max(...columnValues);
    function remove(id) {
        if(window.confirm('you are going to remove Employee ' +
            'with id=' + id)) {
            props.removeFn(id);
        }

    }
    const [employee, setEmployee] = useState({});
    const showDetails = (employee) => setEmployee({...employee});
    const backFn = () => setEmployee({});
    const employeeTableRecords = employees.map (
        (employee) => {
            return <tr key={employee.id}>
                {columnsContent[columns].map((k) => {
                    return <td key={k}>{employee[k]}</td>;
                })}

                {columns === maxColumns ? props.removeFn && userData.isAdmin ?<td>
                    <i className="fa fa-trash" style={{cursor: 'pointer'}}
                    onClick={remove.bind(this,employee.id)}/>
                </td> : null : <td>
                    <i className="fa fa-ellipsis-h" style={{cursor: 'pointer'}}
                       onClick={() => showDetails(employee)}/>
                </td>}
            </tr>
        }
        );
    return employee.id ? <Details employee={employee}
                                  removeFn={userData.isAdmin && props.removeFn ? remove : null} backFn={backFn}/>
    : <table className="table">
        <thead>
        <tr>
            { columnsContent[columns]
                .map((k) => {
                    return <th key={k}>{k}</th>
                }) }
            {(props.removeFn && userData.isAdmin) || columns < maxColumns ? <th/> : null}

        </tr>
        </thead>
        <tbody>
        {employeeTableRecords}
        </tbody>
    </table>
}
