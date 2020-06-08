import React from "react";
export function getInputElement( type, name, label, handler,
                          value) {
    return <div className="form-group">
        <label>{label}</label>
        <input type={type} onChange={handler} name={name}
        value={value} className="form-control"/>

    </div>
}

function getOptions(options) {
    return options.map(option => {
        return <option key={option} value={option}>{option} </option>
    })
}

export function getSelectElement(label, handler,
    name, options) {
    return <div className="form-group">
        <label>{label}</label>
        <select onChange={handler} name={name} className="form-control">
            {getOptions(options)}
        </select>
    </div>
}
export function getRadioButtonElement(name, handler, value) {
    return <div className="form-check" >
        <label className="form-check-label">
            <input className="form-check-input" type="radio"
                  onBlur={handler} name={name} value={value}/>
                {value}
        </label>
    </div>
}

export function getErrorMessage(error) {
    return error ? <label className="alert alert-danger">{error}
    </label> : <div></div>
}
