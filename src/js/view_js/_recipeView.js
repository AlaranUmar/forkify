export class recipeView{
    constructor() {
        this._parentEl = document.querySelector(".recipe")
        this._data = {}
    }
    addHandlerRender(recipe) {
        this._data.id = recipe.id;
        this._data.img_url = recipe.image_url;
        this._data.title = recipe.title;
        this._data.time = recipe.cooking_time;
        this._data.ingredients = recipe.ingredients;
        this._data.servings = recipe.servings;
        this._data.publisher = recipe.publisher;
        this._data.src = recipe.source_url;
        console.log(recipe.ingredients)
        const html = this.generateMarkup(this._data);
        this._parentEl.innerHTML = "";
        this._parentEl.insertAdjacentHTML(
        'beforeend',
        html
        );

    }
    generateMarkup(data) {
        return `
        <figure class="recipe__fig">
            <img src="${data.img_url}" alt="Tomato" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="src/img/icons.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${data.time}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="src/img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                        <use href="src/img/icons.svg#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                    <svg>
                        <use href="src/img/icons.svg#icon-plus-circle"></use>
                    </svg>
                </button>
                </div>
            </div>

            <div class="recipe__user-generated">
                <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round">
                <svg class="">
                    <use href="src/img/icons.svg#icon-bookmark-fill"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${data.ingredients.map(element =>{
                            `
                                <li class="recipe__ingredient">
                                  <svg class="recipe__icon">
                                    <use href="src/img/icons.svg#icon-check"></use>
                                  </svg>
                                  <div class="recipe__quantity">${element.quantity}</div>
                                  <div class="recipe__description">
                                    <span class="recipe__unit">${element.unit}</span>
                                    ${element.description}
                                  </div>
                                </li>`;
            }).join("")}
                <li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">1000</div>
                <div class="recipe__description">
                    <span class="recipe__unit">g</span>
                    pasta
                </div>
                </li>

                <li class="recipe__ingredient">
                <svg class="recipe__icon">
                    <use href="src/img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__quantity">0.5</div>
                <div class="recipe__description">
                    <span class="recipe__unit">cup</span>
                    ricotta cheese
                </div>
                </li>
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
                    <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
            </a>
        </div>
      </div>

        `;
    }
    getId() {
        
    }
}