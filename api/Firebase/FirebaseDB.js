import Axios from 'axios';
import BuildAPIURL from '../URLBuilder/BuildAPIURL.js';

class FirebaseDB {

    addRecipe = (recipe,myCancelToken) => {
      return new Promise(resolve => {
        Axios.get(BuildAPIURL.addRecipeURL(recipe),{cancelToken: myCancelToken})
          .catch(error => {
            resolve(null);
          }).then(recipes => {
            if(recipes){
              resolve(recipes);
            }
          })
      })
    };

    getRecipe = (ingredients) => {
        return new Promise(resolve => {
            Axios.get(BuildAPIURL.getRecipeURL(ingredients),{cancelToken: myCancelToken})
              .catch(error => {              
                resolve(null);
              }).then(recipes => {
              if (recipes) {
                resolve(recipes);
              }
            });
        });
    };

    getAllRecipes = (myCancelToken) => {
        return new Promise(resolve => {
            Axios.get(BuildAPIURL.getAllRecipesURL(),{cancelToken: myCancelToken})
              .catch(error => {              
                resolve(null);
              }).then(recipes => {
              if (recipes) {
                resolve(recipes);
              }
            });
        });
    };
}

export default new FirebaseDB();