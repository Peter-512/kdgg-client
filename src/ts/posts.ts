import { fetchPosts } from './rest'
import clearElement from './util/clear'
import PostCard from './components/PostCard'

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
        main.append(new PostCard(post))
    }
}
