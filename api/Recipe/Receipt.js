import Axios from 'axios';
import BuildAPIURL from '../URLBuilder/BuildAPIURL.js';

class FirebaseAuth {

    receipt = (pathToData, myCancelToken) => {
        return new Promise(resolve => {
            Axios.post(BuildAPIURL.recipeURL(pathToData),{cancelToken: myCancelToken})
              .catch(error => {              
                resolve(null);
              }).then(recipe => {
              if (recipe) {
                resolve(recipe);
              }
            });
        });
    };

}

export default new FirebaseAuth();
