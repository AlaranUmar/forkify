export const state = {
    search: {
        query: "",
        results:[]
    },
    recipe: {},
    bookmarks:[]
};
class modelRecipe{
    #id;
    constructor(id, publisher, title, img_url) {
        this.#id = id;
        this._publisher = publisher;
        this._title = title;
        this._img_url = img_url;
    }
    getId() {
        return this.#id
    }
}

export async function loadRecipes(query) {
    try {
        state.search.query = query
        state.search.results = []
        const apiLink = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`;
        const res = await fetch(apiLink)
        const { data } = await res.json()
        const recipes = data.recipes
        recipes.forEach(recipe => {
            const newRecipe = new modelRecipe(recipe.id, recipe.publisher, recipe.title, recipe.image_url)
            state.search.results.push(newRecipe)
        });
        console.log("Search results saved")
    } catch(error) {
        console.error(error)
    }
}

export async function getRecipe(id) {
    try {
        const apiLink =
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        const res = await fetch(apiLink)
        const {data} = await res.json()
        const { recipe } = data
        state.recipe = recipe

    }
    catch (error) {
        console.error(error)
    }
}

// https://forkify-api.herokuapp.com/v2