import '../scss/styles.scss'
import 'bootstrap'
import { showUsers } from './users'
import { showPosts } from './posts'

const usersLink = document.querySelector('#users-link')
const postLink = document.querySelector('#posts-link')

if (!usersLink || !postLink) throw new Error('No links found')

await showUsers()
let currentPage: 'users' | 'posts' = 'users'

usersLink.addEventListener('click', async () => {
    if (currentPage === 'users') return
    currentPage = 'users'
    postLink.classList.remove('active')
    usersLink.classList.add('active')
    await showUsers()
})

postLink.addEventListener('click', async () => {
    if (currentPage === 'posts') return
    currentPage = 'posts'
    usersLink.classList.remove('active')
    postLink.classList.add('active')
    await showPosts()
})
