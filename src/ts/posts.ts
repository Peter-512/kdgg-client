import { fetchPosts } from './rest'
import clearElement from './util/clear'
import PostCard from './components/PostCard'
import LoadingIndicator from './components/LoadingIndicator'

export async function showPosts() {
    const main = document.querySelector('main')
    if (!main) throw new Error('No main element found')

    clearElement(main)
    main.append(new LoadingIndicator())

    const posts = await fetchPosts()
    clearElement(main)

    posts.map(post => {
        main.append(new PostCard(post))
    })
}
