import appFirebase from "../config/firebase";
import {docData} from "rxfire/firestore";
import {authState} from "rxfire/auth";
import {map, mergeMap} from "rxjs/operators";
import firebase from "firebase";
import {of} from "rxjs";
export default class AuthFirebaseService {
    constructor() {
        this.auth = appFirebase.auth();
    }
    login(user) {
        return user ?  this.emailAuth(user) : this.googleAuth();
    }

    emailAuth(user) {
        return this.auth.signInWithEmailAndPassword(user.email, user.password);
    }
    googleAuth() {
        const authProvider = new firebase.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(authProvider)
    }
    logout() {
        return this.auth.signOut()
    }
    getUserData() {
        return authState(this.auth)
            .pipe(mergeMap(user => {
                if (!user || !user.email) {
                    return of({});
                }
                return docData(appFirebase.firestore().collection("administrators").doc(user.email))
                    .pipe(map (admin => {
                        return {username: user.email, isAdmin: !!admin.email  }
                    }))
            }))
    }
}
