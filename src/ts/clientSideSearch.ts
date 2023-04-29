import { currentPage } from './index'
import type PostCard from './components/PostCard'
import type UserCard from './components/UserCard'

export default function clientSideSearch() {
    const searchBar: HTMLInputElement | null = document.querySelector('#search-bar')

    if (!searchBar) throw new Error('No clientSideSearch bar found')

    searchBar.addEventListener('keyup', () => {
        if (currentPage !== 'users' && currentPage !== 'posts') return

        const searchValue = searchBar.value.toLowerCase()
        const cards = document.querySelectorAll('.card') as unknown as (PostCard | UserCard)[]

        cards.forEach(card => {
            card.style.display = card.textContent?.toLowerCase()
                .includes(searchValue) ? 'block' : 'none'
        })
    })
}
