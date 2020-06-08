import React from "react";
const Details = (props) => {
    const employee = props.employee;
    const removeFn = props.removeFn;
    const backFn = props.backFn;
    return <div className="card">
        <h3 className="card-header">Employee {employee.id}</h3>
        {Object.entries(employee).map(e => {
            return <h6 key={e[0]}>{e[0]}:{e[1]}</h6>
        })}
        {removeFn ? <button onClick={() => {
            removeFn(employee.id);
            backFn();
        }}>Remove</button> : null}
        <button onClick={backFn}>Back</button>

    </div>
}
export default Details;
