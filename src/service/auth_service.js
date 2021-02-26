import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider).then(result => {
            console.log("로그인 결과 ", result);
            return result;
        }).catch(error => {
            console.log("로그인 에러 ",error);
            if (error.code === 'auth/account-exists-with-different-credential'){
                firebaseApp.auth().fetchSignInMethodsForEmail(error.email).then(providers => {
                    if (providers[0] === 'google.com') {
                        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
                        firebaseApp.auth().signInWithRedirect(GoogleProvider).then(result => {
                            firebaseApp.auth().signInWithCredential(result.credential).then(user => {
                                user.linkWithCredential(error.credential);
                            }).catch(event => {console.log("구글 연동 로그인 실패 ", event)})
                        }).catch(event => {console.log("구글 연동 실패 ", event)})
                    }
                })
            }
        })
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

