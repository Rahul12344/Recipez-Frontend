class BuildAPIURL {
    
    hostName = "http://localhost:3000/";

    /* Firebase Auth URLS  */
    loginURL = (email,password) => {
        return this.hostName + "login?email=" + email + "&password=" + password;
    };

    signUpURL = (email,password) => {
        return this.hostName + "register?email=" + email + "&password=" + password;
    };

    logoutURL = () => {
        return this.hostName + "logout";
    };

    /* Firebase DB URLS */
    getRecipeURL = (ingredients) => {
        return this.hostName + "getrecipes?ingredients=" + ingredients;
    };

    getAllRecipesURL = () => {
        return this.hostName + "getallrecipes";
    };

    addRecipeURL = (recipe) => {
        return  this.hostName + "addrecipe?recipe=" + recipe
    };

    recipeURL = (filePath) => {
        return this.hostName + "receipttorecipe?file="+filePath;
    };

}

export default new BuildAPIURL();