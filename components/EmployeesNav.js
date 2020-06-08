import React from 'react';
import {LINKS, PATH_LOGOUT} from "../config/employees_config";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
export default function EmployeesNav () {
    const userData = useSelector(state => state.userData);
   const links =  LINKS.map(l => {
        return (l.admin && userData.isAdmin) || !l.admin ?<li key={l.path} className="nav-item">
            <Link to={l.path}>
                <span className="nav-link">{l.label}</span>
            </Link>
        </li> : null
    })
    return <ul className="nav">
        {links}
        {userData.username ? <li className="nav-item">
            <Link to={PATH_LOGOUT}>
                <span className="nav-link">{userData.username}</span>
            </Link>
        </li> : null}
    </ul>
}
