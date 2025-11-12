// =`
import icons from 'url:../../img/icons.svg';

export class bookmarkView {
    constructor() {
        // localStorage.clear();
        
		this._bookmarksID =
			JSON.parse(localStorage.getItem('bookmarked')) || [];
		this._parentEl = document.querySelector('.bookmarks__list');
		this.message = this._parentEl.querySelector('.message');
	}
	renderBook(handler) {
		this._bookmarksID.forEach(el => {
			handler(el);
		});
	}
	render(recipe, param = false) {
		this.message.classList.add('hidden');
		if (!this._bookmarksID.includes(recipe.id) || param) {
			this._parentEl.insertAdjacentHTML(
				'beforeend',
				this.generateMarkup(recipe)
			);
			if (!param) {
				this._bookmarksID.push(recipe.id);
				localStorage.setItem(
					'bookmarked',
					JSON.stringify(this._bookmarksID)
				);
			}
		}
	}
	generateMarkup(recipe) {
		return `<li class="preview">
        <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
                        <img src="${recipe.image_url}" alt="Test" />
                        </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe.title} ...</h4>
                        <p class="preview__publisher">The ${recipe.publisher}</p>
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
