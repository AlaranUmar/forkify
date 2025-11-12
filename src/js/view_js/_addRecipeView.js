export class addRecipeView{
    constructor() {
        this._parentEl = document.querySelector('.nav__btn--add-recipe');
        this._overlay1 = document.querySelector(".overlay")
        this._overlay2 = document.querySelector('.add-recipe-window');
        this._form = document.querySelector('.upload');
        this._cancle = document.querySelector('.btn--close-modal');
    }
    addHandlerAddRecipe(handler) {
        this._parentEl.addEventListener("click", () => {
            this._overlay1.classList.remove("hidden")
            this._overlay2.classList.remove("hidden")
        })
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            const d = e.target.querySelectorAll('input');
            d.forEach(element => {
                if (!element.value) return
            });
            handler()
        })
        this._cancle.addEventListener("click", () => {
            this._overlay1.classList.add('hidden');
            this._overlay2.classList.add('hidden');
        })
    }
}