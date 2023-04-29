import '../scss/styles.scss'
import 'bootstrap'
import { showUsers } from './users'
import { showPosts } from './posts'
import clientSideSearch from './clientSideSearch'
import { showSearch } from './search'
import { showAdd } from './add'

const usersLink: HTMLAnchorElement | null = document.querySelector('#users-link')
const postLink: HTMLAnchorElement | null = document.querySelector('#posts-link')
const addLink: HTMLAnchorElement | null = document.querySelector('#add-link')
const searchLink: HTMLAnchorElement | null = document.querySelector('#search-link')

if (!usersLink || !postLink || !addLink || !searchLink) throw new Error('Missing link in navbar')

const links = [usersLink, postLink, addLink, searchLink]
export let currentPage = localStorage.getItem('currentPage') as ('users' | 'posts' | 'add' | 'search') || 'users'

switch (currentPage) {
    case 'users':
        setNavLinkActive(usersLink)
        await showUsers()
        break
    case 'posts':
        setNavLinkActive(postLink)
        await showPosts()
        break
    case 'add':
        setNavLinkActive(addLink)
        await showAdd()
        break
    case 'search':
        setNavLinkActive(searchLink)
        await showSearch()
        break
    default:
        setNavLinkActive(usersLink)
        await showUsers()
        break
}

clientSideSearch()

function setNavLinkActive(link: HTMLAnchorElement) {
    links.forEach(link => link?.classList.remove('active'))
    link.classList.add('active')
}

async function showContent(link: HTMLAnchorElement, page: typeof currentPage, showFunction: () => Promise<void>) {
    if (currentPage === page) return
    currentPage = page
    localStorage.setItem('currentPage', page)
    setNavLinkActive(link)
    await showFunction()
}

usersLink.addEventListener('click', async () => {
    await showContent(usersLink, 'users', showUsers)
})

postLink.addEventListener('click', async () => {
    await showContent(postLink, 'posts', showPosts)
})

addLink.addEventListener('click', async () => {
    await showContent(addLink, 'add', showAdd)
})

searchLink.addEventListener('click', async () => {
    await showContent(searchLink, 'search', showSearch)
})
