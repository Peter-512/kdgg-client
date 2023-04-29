import { type Post } from '../types'

export default class PostCard extends HTMLDivElement {
    constructor(post: Post) {
        super()

        this.className = 'card m-3 flex-shrink-0 position-relative shadow'
        this.id = `post-${post.postID}`
        this.innerHTML = `
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill ${post.upVotes > 0 ? 'bg-success text-black' : 'bg-danger'}">
            ${post.upVotes}
        </span>
        <div class="card-body">
            <h5 class="card-title">by ${post.username}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${post.postedAt.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })}</h6>
            <p class="card-text">${post.content}</p>
        </div>`
    }
}

customElements.define('post-card', PostCard, { extends: 'div' })
