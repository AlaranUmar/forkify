import icons from 'url:../../img/icons.svg';
import { state } from '../model_js/_recipeModel';
export class recipeView {
	constructor() {
		this._parentEl = document.querySelector('.recipe');
		this._data = {};
		this._spinner = this._parentEl.querySelector('.spinner');
		this._message = this._parentEl.querySelector('.message');
	}
	renderSpinner() {
		this._message.classList.add('hidden');
		this._spinner.classList.remove('hidden');
		this._parentEl.querySelector('.under-recipe')?.remove();
	}
	addHandlerRender(recipe, handler) {
		this._spinner.classList.add('hidden');
		this._data.id = recipe.id;
		this._data.img_url = recipe.image_url;
		this._data.title = recipe.title;
		this._data.time = recipe.cooking_time;
		this._data.ingredients = recipe.ingredients;
		this._data.servings = recipe.servings;
		this._data.publisher = recipe.publisher;
		this._data.src = recipe.source_url;
        const html = this.generateMarkup(this._data);
        this._parentEl.innerHTML = ""
		this._parentEl.insertAdjacentHTML('beforeend', html);
		this.boomark = document.querySelector('.btn--round');
		this.boomark.addEventListener('click', () => {
			handler(this._data.id);
		});
	}
	generateMarkup(data) {
		return `
    <div class="under-recipe">

    <figure class="recipe__fig">
        <img src="${data.img_url}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
            <span>${data.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
				data.time
			}</span>
            <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
				data.servings
			}</span>
            <span class="recipe__info-text">servings</span>
            <div class="recipe__info-buttons">
                <button class="btn--tiny btn--decrease-servings">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
                </div>
            </div>
            <div class="recipe__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round">
                <svg class="">
                    <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
            </button>
        </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${data.ingredients
			.map(
				element => `
                            <li class="recipe__ingredient">
                                <svg class="recipe__icon">
                                    <use href="${icons}#icon-check"></use>
                                </svg>
                                <div class="recipe__quantity">${
									element.quantity ? element.quantity : ''
								}</div>
                                <div class="recipe__description">
                                    <span class="recipe__unit">${
										element.unit
									}</span>
                                    ${element.description}
                                </div>
                            </li>`
			)
			.join('')}
        
        </ul>
    </div>

    <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
        </p>
        <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
        >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </a>
    </div>

    </div>
        `;
	}
	addHandlerServings(handler) {
		this._parentEl.addEventListener('click', e => {
			const btn = e.target.closest(
				'.btn--increase-servings, .btn--decrease-servings'
			);
			if (!btn) return;
			const upDateTo = btn.classList.contains('btn--increase-servings')
				? state.recipe.servings + 1
				: state.recipe.servings - 1;
			if (upDateTo > 0) {
				handler(upDateTo);
				this.updateRecipeView(state.recipe);
			}
		});
	}
	updateRecipeView(recipe) {
		document.querySelector('.recipe__info-data--people').textContent =
			recipe.servings;
		const quantityEl = document.querySelectorAll('.recipe__quantity');
		quantityEl.forEach((el, i) => {
			const quant = recipe.ingredients[i].quantity.toFixed(1);
			if (quant == 0) {
				el.textContent = '';
			} else {
				el.textContent = quant;
			}
		});
	}
}
