import clearElement from './util/clear'
import { Post } from './types'
import { showToast } from './util/toast'

export async function showSearch() {
    const main = document.querySelector('main')
    if (!main) throw new Error('No main element found')

    clearElement(main)

    main.innerHTML = `
    <div class="input-group m-5">
        <div class="form-floating text-success">
            <input id="search-input" type="text" class="form-control bg-black border-success text-primary" placeholder="Search for a channel" aria-label="Search for a channel" aria-describedby="search-button">
            <label for="search-input">Search for a post</label>
        </div>
    </div>
    
    <table class="m-5 table table-dark table-striped table-hover rounded overflow-hidden shadow-lg"></table>
    `

    const searchInput: HTMLInputElement | null = document.querySelector('#search-input')
    const table: HTMLTableElement | null = document.querySelector('table')

    if (!searchInput || !table) throw new Error('Oops something went wrong')

    searchInput.addEventListener('keyup', async (e) => {
        e.preventDefault()
        const searchValue = searchInput.value
        clearElement(table)
        if (!searchInput.value) return

        const response = await fetch(`http://localhost:8081/api/posts?searchValue=${searchValue}`)
        if (response.status == 204) {
            showToast('warning', 'No posts found', `No posts were found matching '${searchValue}'`)
            return
        }
        if (!response.ok) {
            showToast('danger', 'Error', 'An error occurred while searching for posts')
            return
        }

        const posts: Post[] = await response.json()

        const tableBody = document.createElement('tbody')
        tableBody.classList.add('table-group-divider')
        // set up table headers
        table.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Post ID</th>
                <th scope="col">Username</th>
                <th scope="col">Posted At</th>
                <th scope="col">Content</th>
                <th scope="col">Upvotes</th>
            </tr>
        </thead>`

        posts.map((post) => {
            const row = document.createElement('tr')
            row.innerHTML = `
            <td>${post.postID}</td>
            <td>${post.username}</td>
            <td>${post.postedAt}</td>
            <td>${post.content}</td>
            <td>${post.upVotes}</td>`
            tableBody.append(row)
        })

        table.append(tableBody)
    })
}
