import '../scss/styles.scss'
import 'bootstrap'
import { showUsers } from './users'
import { showPosts } from './posts'

const homeLink = document.querySelector('#home-link')
const addLink = document.querySelector('#add-link')

if (!homeLink || !addLink) throw new Error('No links found')

await showUsers()
let currentPage = 'home'

homeLink.addEventListener('click', async () => {
    if (currentPage === 'home') return
    currentPage = 'home'
    addLink.classList.remove('active')
    homeLink.classList.add('active')
    await showUsers()
})

addLink.addEventListener('click', async () => {
    if (currentPage === 'add') return
    currentPage = 'add'
    homeLink.classList.remove('active')
    addLink.classList.add('active')
    await showPosts()
})
