// =`
export class resultsView{
    childId;
    constructor() {
        this._parentEl = document.querySelector(".results")
    }
    render(recipes) {
        console.log('gotten results');
        this._parentEl.innerHTML = recipes.map(this.generateMarkup).join('');
    }
    generateMarkup(recipe) {
        
        return `<li class="preview">
        <a class="preview__link" href="#${recipe.getId()}">
        <figure class="preview__fig">
                        <img src="${recipe._img_url}" alt="Test" />
                        </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe._title} ...</h4>
                        <p class="preview__publisher">The ${recipe._publisher}</p>
                        <div class="preview__user-generated">
                            <svg>
                                <use href="src/img/icons.svg#icon-user"></use>
                            </svg>
                            </div>
                    </div>
                </a>
            </li>`;
    }
    addListener(handler) {
        const children = this._parentEl.querySelectorAll('.preview__link');
        children.forEach(child => {
            child.addEventListener("click", function () {
                children.forEach(ch =>
                    ch.classList.remove('preview__link--active')
                );
                child.classList.add('preview__link--active');
                let childId = child.getAttribute('href').slice(1)
                console.log(childId)
                handler(childId)
            })
        })
    }

}
