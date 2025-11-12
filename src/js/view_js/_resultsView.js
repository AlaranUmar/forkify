// =`
import icons from 'url:../../img/icons.svg';
export class resultsView {
	childId;
	constructor() {
		this._parentEl = document.querySelector('.search-results');
	}
	render(recipes) {
		this._new_recipes = [];
		this._parentEl.querySelectorAll('.results')?.forEach(el => {
			el?.remove();
		});
		const chunck = 10;
		for (let i = 0; i < recipes.length; i += chunck) {
			const ch = recipes.slice(i, i + chunck);
			this._new_recipes.push(ch);
		}
		this._new_recipes.forEach((page, index) => {
			this._child = document.createElement('ul');
			this._child.classList.add(`results${index}`, 'results');
			this._parentEl.append(this._child);
			if (!(index === 0)) {
				this._child.classList.add('hidden');
			}
			this._child.innerHTML = page.map(this.generateMarkup).join('');
			if (!(index === 0) && !(index === this._new_recipes.length - 1)) {
				const pagination = `<div class="pagination">
                    <button class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
							</svg>
                        <span>Page ${index}</span>
						</button>
						<button class="btn--inline pagination__btn--next">
                        <span>Page ${index + 2}</span>
                        <svg class="search__icon">
						<use href="${icons}#icon-arrow-right"></use>
                        </svg>
						</button>
						</div>`;
						
						this._child.insertAdjacentHTML('beforeend', pagination);
					} else if (index === 0 && recipes.length > chunck) {
						const pagination = `<div class="pagination">
						<button class="btn--inline pagination__btn--next ">
						<span>Page 2</span>
						<svg class="search__icon">
						<use href="${icons}#icon-arrow-right"></use>
						</svg>
						</button>
						</div>`;
						this._child.insertAdjacentHTML('beforeend', pagination);
			}
			else if (
						index === this._new_recipes.length - 1 &&
						recipes.length > chunck
					) {
						const pagination = `<div class="pagination">
                        <button class="btn--inline pagination__btn--prev">
						<svg class="search__icon">
						<use href="${icons}#icon-arrow-left"></use>
						</svg>
						<span>Page ${index}</span>
                        </button>
                    </div>`;
					this._child.insertAdjacentHTML('beforeend', pagination);
			}
		});
		this._prev = document.querySelectorAll(
			'.pagination__btn--prev'
		);
		this._next = document.querySelectorAll(
			'.pagination__btn--next'
		);
		this._next?.forEach(btn => {
			btn.addEventListener('click', e => {
				const current = e.target.closest('.results');
				let nextitem = current.nextElementSibling;
				document.querySelectorAll('.results').forEach(el => {
					el.classList.add("hidden")
				})
				nextitem.classList.remove('hidden');
			});
		});
		this._prev?.forEach(btn => {
			btn.addEventListener('click', e => {
				const current = e.target.closest('.results');
				let nextitem = current.previousElementSibling;
				document.querySelectorAll('.results').forEach(el => {
					el.classList.add("hidden")
				})
				nextitem.classList.remove('hidden');
			});
		});
		
	}
	generateMarkup(recipe) {
		return `<li class="preview">
        <a class="preview__link" href="#${recipe.getId()}">
        <figure class="preview__fig">
                        <img src="${recipe._img_url}" alt="Test" />
                        </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe._title} ...</h4>
                        <p class="preview__publisher">The ${
							recipe._publisher
						}</p>
                        <div class="preview__user-generated">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                            </div>
                    </div>
                </a>
            </li>`;
	}
	addListener(handler) {
		const children = this._parentEl.querySelectorAll('.preview__link');
		children.forEach(child => {
			child.addEventListener('click', function () {
				children.forEach(ch =>
					ch.classList.remove('preview__link--active')
				);
				child.classList.add('preview__link--active');
				let childId = child.getAttribute('href').slice(1);
				handler(childId);
			});
		});
	}
}
