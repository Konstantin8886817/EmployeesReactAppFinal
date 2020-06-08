import appFirebase from "../config/firebase";
import {collectionData} from "rxfire/firestore";

export default class EmployeesFirebaseService {
    constructor(collection) {

        this.db = appFirebase.firestore().collection(collection);
    }
    getEmployees() {
        return collectionData(this.db);
    }
    addEmployee(employee) {
        return this.db.doc("" + employee.id).set(employee);
    }
    deleteEmployee(id) {
        return this.db.doc("" + id).delete();
    }
}
