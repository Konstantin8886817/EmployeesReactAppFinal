import React, {useEffect, useState} from 'react';

import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import EmployeesNav from "./components/EmployeesNav";
import {
  ACCESS_TOKEN, COLLECTION_EMPLOYEES,
  PATH_EMPLOYEES,
  PATH_GENERATION, PATH_LOGIN,
  PATH_SALARY_STATISTICS, PATH_SEARCH,
  PATH_TITLE_STATISTICS
} from "./config/employees_config";
import Employees from "./components/Employees";
import TitleStatistics from "./components/TitleStatistics";
import EmployeesGeneration from "./components/EmployeesGeneration";
import SalaryStatistics from "./components/SalaryStatistics";
import EmployeesSearch from "./components/EmployeesSearch";

import Login from "./components/Login";
import Logout from "./components/Logout";
import EmployeesFirebaseService from "./services/EmployeesFirebaseService";
import AuthFirebaseService from "./services/AuthFirebaseService";
import {useDispatch, useSelector} from "react-redux";
import {actionEmployees, actionUserData} from "./store/actions";
const App = () => {
  const employeesService = new EmployeesFirebaseService(COLLECTION_EMPLOYEES);
  const authService = new AuthFirebaseService();
  const dispatch = useDispatch(); //react hook for possibility to updating global store
  const userData = useSelector(state => state.userData);
  useEffect(() => {
    authService.getUserData()
        .subscribe(userData => {
          dispatch(actionUserData(userData)); //update state
          if (userData.username) {
            employeesService.getEmployees().subscribe(orders => {
              dispatch(actionEmployees(orders));
            }, error => alert(JSON.stringify(error)))
          }
        })

  }, []);



  return <BrowserRouter>
    <EmployeesNav />
    <Redirect to={PATH_GENERATION}/>
    <Switch>
      <Route path={PATH_EMPLOYEES} exact render={() => {
        return userData.username ? <Employees  employeesService={employeesService}/>
        : <Redirect to={PATH_LOGIN}/>
      }}/>
      <Route path={PATH_TITLE_STATISTICS} exact render={() => {
        return userData.username ? <TitleStatistics />
        : <Redirect to={PATH_LOGIN}/>
      }}/>
      <Route path={PATH_GENERATION} exact render={() => {
        return userData.isAdmin ? <EmployeesGeneration employeesService={employeesService}/>
          : <Redirect to={PATH_LOGIN}/>
      }}/>
      <Route path={PATH_SALARY_STATISTICS} exact render={() => {
        return userData.username ? <SalaryStatistics/>
            : <Redirect to={PATH_LOGIN}/>
      }}/>
      <Route path={PATH_SEARCH} exact render={() => {
        return userData.username ? <EmployeesSearch />
            : <Redirect to={PATH_LOGIN}/>
      }}/>
      <Route path={PATH_LOGIN} exact render={
        () => {
          return !userData.username ? <Login authService={authService}
                                    />
              : <Redirect to={PATH_EMPLOYEES}/>
        }
      }>

      </Route>
      <Route path={'/logout'} exact render={
        () => {
          return userData.username ? <Logout authService={authService}
                                   />
              : <Redirect to={PATH_LOGIN}/>
        }
      }>

      </Route>

    </Switch>
  </BrowserRouter>
}


export default App;
