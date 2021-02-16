import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);

        // try {
        //     return firebaseApp.auth().signInWithPopup(authProvider);
        // } catch (error) {
        //     if (error.code === 'auth/account-exists-with-different-credential') {
        //         const pendingCred = error.credential;
        //         const eamil = error.email;

        //         auth.fetchSignInMethodsForEmail(email).then(function (methods) {
        //             if (methods[0] === 'password') {
        //                 const password = promptUserForPassword();
        //                 auth.signInWithEmailAndPassword(email, password).then(function (result) {
        //                     return result.user.linkWithCredential(pendingCred);
        //                 }).then(function () {
        //                     goToApp();
        //                 });
        //                 return;
        //             }
        //             var provider = getProviderForProviderId(methods[0]);

        //             auth.signInWithPopup(provider).then(function (result_1) {
        //                 result_1.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
        //                     goToApp();
        //                 });
        //             });
        //         });
        //     }
        // }
    }

    logout() {
        firebase.auth().signOut();
    }

    onAuthChange(onUserChanged) {
        firebase.auth().onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }
}

export default AuthService;

