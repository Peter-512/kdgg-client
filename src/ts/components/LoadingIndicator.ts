export default class LoadingIndicator extends HTMLDivElement {
    constructor() {
        super()
        this.className = 'spinner-grow position-absolute top-50 start-50 text-success'
        this.style.width = '3rem'
        this.style.height = '3rem'
        this.setAttribute('role', 'status')
        const span = document.createElement('span')
        span.className = 'visually-hidden'
        span.innerText = 'Loading...'
        this.append(span)
    }
}

customElements.define('loading-indicator', LoadingIndicator, { extends: 'div' })
