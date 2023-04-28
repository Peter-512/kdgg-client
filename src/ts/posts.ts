import { fetchPosts } from './rest'
import clearElement from './util/clear'

export async function showPosts() {
    const main = document.querySelector('main')
    if (!main) throw new Error('No main element found')

    clearElement(main)

    main.innerHTML = `
    <div class="spinner-grow position-absolute top-50 start-50 text-success" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`

    const posts = await fetchPosts()
    clearElement(main)

    for (const post of posts) {
        const card = document.createElement('div')
        card.className = 'card m-3 flex-shrink-0 position-relative shadow'
        main.append(card)

        card.innerHTML = `
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
