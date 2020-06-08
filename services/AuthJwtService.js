import {Axios} from "axios-observable";
import {map, mergeMap} from "rxjs/operators"
import {of} from 'rxjs'
import {ACCESS_TOKEN} from "../config/employees_config";
export default class AuthJwtService {
    constructor(url) {
        if (!url) {
            throw Error('url is undefined');
        }
        this.url = url;
    }
    register(users) {
        Axios.get(this.url + 'users')
            .pipe(map(response => response.data))
            .subscribe(data => {
                if (!data || data.length === 0) {
                    users.forEach(user => {
                        Axios.post(this.url + 'register', user)
                            .subscribe();
                    })

                }
            })
    }
    login(credentials) {
        return Axios.post(this.url + 'login', credentials)
            .pipe(mergeMap(response => {
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                return this.getUserData();
            }))
    }
    logout() {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    getUserData() {
        const jwt = localStorage.getItem(ACCESS_TOKEN);
        if (!jwt) {
            return of({});
        }
        const jwtBody = JSON.parse(atob(jwt.split('.')[1]));

        const currentTimeInSeconds = new Date() / 1000;
        if (currentTimeInSeconds > jwtBody.exp) {
            this.logout();
            return of({});
        }
        const username = jwtBody.email;
        let isAdmin = false;
        return Axios.get(this.url + 'administrators').pipe(map(response => {
            const administrators = response.data;
            if (administrators && administrators.length > 0) {
                if (administrators.indexOf(username) >= 0) {
                    isAdmin = true;
                }
            }
            return {username, isAdmin}
        }));

    }
}
