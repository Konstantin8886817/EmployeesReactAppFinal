import React from "react";
export default function Logout(props) {
    const authService = props.authService;

    const onLogout = () => {
        if (window.confirm('You are going to perform logout')) {
            authService.logout();
           
        }

    }
    return <i style={{"cursor":"pointer"}} onClick={onLogout}
              className="fa fa-sign-out">Sign Out</i>
}
