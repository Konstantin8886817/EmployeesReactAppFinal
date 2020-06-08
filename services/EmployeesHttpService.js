import {Axios} from "axios-observable";
import {map} from "rxjs/operators"
import {ACCESS_TOKEN} from "../config/employees_config";
export default class EmployeesHttpService {
    constructor(url) {
        if (!url) {
            throw Error("url doesn't exist");
        }
        this.url = url;
    }
    getEmployees() {
        return Axios.get(this.url, {
            headers: {"Authorization":'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
            .pipe(map(response => response.data));
    }
    addEmployee(employee) {
        return Axios.post(this.url, employee, {
            headers: {"Authorization":'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        }).toPromise();


    }
    deleteEmployee(id) {
        return Axios.delete(this.url +
            encodeURIComponent(id), {
            headers: {"Authorization":'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        }).toPromise()


    }
}
