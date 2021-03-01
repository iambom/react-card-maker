import { firebaseAuth, githubProvider, googleProvider } from './firebase';

class AuthService {
    login(providerName) {
        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider).then(result => {
            return result;
        }).catch(error => {
            console.log(error);
            if (error.code === 'auth/account-exists-with-different-credential'){
                firebaseAuth.fetchSignInMethodsForEmail(error.email).then(providers => {
                    if (providers[0] === 'google.com') {
                        firebaseAuth.signInWithRedirect(googleProvider).then(result => {
                            firebaseAuth.signInWithCredential(result.credential).then(user => {
                                user.linkWithCredential(error.credential);
                            }).catch(event => {})
                        }).catch(event => {})
                    }
                })
            }
        })
    }   

    logout() {
        firebaseAuth.signOut();
    }

    onAuthChange(onUserChanged) {
        firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        })
    }

    getProvider(providerName) {
        switch(providerName) {
            case 'Google':
                return googleProvider;
            case 'Github':
                return githubProvider;
            default: throw new Error(`not supported provider : ${providerName}`);
        }
    }
}

export default AuthService;

