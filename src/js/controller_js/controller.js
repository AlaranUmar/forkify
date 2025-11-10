import { searchView } from '../view_js/_searchView';
import {
    loadRecipes,
    getRecipe,
    state,
    updateServings,
} from '../model_js/_recipeModel';
import { resultsView } from '../view_js/_resultsView';
import { recipeView } from '../view_js/_recipeView';
const Search = new searchView();
const Result = new resultsView();
const Recipe = new recipeView();
function init() {
    Search.addHandlerSearch(controlSearchResults);
}

async function controlSearchResults() {
    const query = Search.getQuery();
    await loadRecipes(query);
    Result.render(state.search.results);
    Result.addListener(controlRecipe);
}
async function controlRecipe(id) {
    await getRecipe(id);
    Recipe.addHandlerRender(state.recipe);
    Recipe.addHandlerServings(updateServings);
}

init();

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

///////////////////////////////////////
