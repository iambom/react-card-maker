import firebase from 'firebase';

/*
로그인, 로그아웃 authentication 담당
firebase auth 라는 함수를 이용해서 간단하게 이용할 수 있음

중복되는 로직이어서 로그인 할 때 어떤 provider를 이용할 건지 전달해주면 거기에 맞춰서 로그인 할 수 있게 해준다.

*/
class AuthService {
    login(providerName) {
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebase.auth().signInWithPopup(authProvider);
    }
}

export default AuthService;