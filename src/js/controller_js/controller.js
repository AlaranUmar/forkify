import { searchView } from '../view_js/_searchView';
import {
	loadRecipes,
	getRecipe,
	state,
	updateServings,
	upload,
} from '../model_js/_recipeModel';
import { resultsView } from '../view_js/_resultsView';
import { recipeView } from '../view_js/_recipeView';
import { addRecipeView } from '../view_js/_addRecipeView';
import { bookmarkView } from '../view_js/_bookmarkView';
const Search = new searchView();
const Result = new resultsView();
const Recipe = new recipeView();
const addRecipe = new addRecipeView();
const bookmark = new bookmarkView();
function init() {
	Search.addHandlerSearch(controlSearchResults);
	addRecipe.addHandlerAddRecipe(controlUpload);
	bookmark.renderBook(initBookmark);
}
async function initBookmark(id) {
	const c = await getRecipe(id, true);
	bookmark.render(c, true);
	bookmark.addListener(controlRecipe);
}
async function controlSearchResults() {
	const query = Search.getQuery();
	await loadRecipes(query);
	Result.render(state.search.results);
	Result.addListener(controlRecipe);
}
async function controlRecipe(id) {
	Recipe.renderSpinner();
	await getRecipe(id);
	Recipe.addHandlerRender(state.recipe, controlBookmark);
	Recipe.addHandlerServings(updateServings);
}
async function controlBookmark(params) {
	const c = await getRecipe(params, true);
	bookmark.render(c);
	bookmark.addListener(controlRecipe);
}
async function controlUpload() {
	upload();
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
