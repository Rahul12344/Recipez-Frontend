import Axios from 'axios';
import BuildAPIURL from '../URLBuilder/BuildAPIURL.js';

class FirebaseAuth {

    login = (email,password,myCancelToken) => {
        return new Promise(resolve => {
            Axios.post(BuildAPIURL.loginURL(email, password),{cancelToken: myCancelToken})
              .catch(error => {              
                resolve(null);
              }).then(user => {
              if (user) {
                resolve(user);
              }
            });
        });
    };

    signup = (email,password,myCancelToken) => {
        return new Promise(resolve => {
            Axios.post(BuildAPIURL.signUpURL(email, password),{cancelToken: myCancelToken})
              .catch(error => {              
                resolve(null);
              }).then(user => {
              if (user) {
                resolve(user);
              }
            });
        });
    };

    logout = (myCancelToken) => {
        return new Promise(resolve => {
            Axios.post(BuildAPIURL.logoutURL(),{cancelToken:myCancelToken})
              .catch(error => {              
                resolve(null);
              }).then(user => {
              if (user) {
                resolve(user);
              }
            });
        });
    };

    validateUser = (myCancelToken) => {
      
    };

}

export default new FirebaseAuth();
