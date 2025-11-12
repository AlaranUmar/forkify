export class searchView{
    constructor() {
        this._parentEl = document.querySelector(".search")
    }
    getQuery() {
        return this._parentEl.querySelector(".search__field").value
    }
    addHandlerSearch(handler) {
        this._parentEl.addEventListener("submit", function (e) {
            e.preventDefault();
            console.log("Submitted")
            handler()
        })
    }
}