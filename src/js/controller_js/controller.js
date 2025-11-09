import { searchView } from "../view_js/_searchView";
import { loadRecipes , getRecipe, state} from "../model_js/_recipeModel";
import { resultsView } from "../view_js/_resultsView";
import { recipeView } from "../view_js/_recipeView";
const Search = new searchView()
const Result = new resultsView();
const Recipe = new recipeView()
function init() {
  Search.addHandlerSearch(controlSearchResults);
  console.log('initialized');
};

async function controlSearchResults() {
  console.log("looking for results")
  const query = Search.getQuery();
  await loadRecipes(query)
  Result.render(state.search.results);
  Result.addListener(controlRecipe)
}
async function controlRecipe(id) {
  console.log("looking for recipe")
  await getRecipe(id)
  Recipe.addHandlerRender(state.recipe)
}
init()







const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};









///////////////////////////////////////
