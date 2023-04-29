import { fetchUsers } from './rest'
import clearElement from './util/clear'
import UserCard from './components/UserCard'

export async function showUsers() {
    const main = document.querySelector('main')
    if (!main) throw new Error('No main element found')

    clearElement(main)

    main.innerHTML = `
    <div class="spinner-grow position-absolute top-50 start-50 text-success" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`

    const users = await fetchUsers()
    clearElement(main)

    for (const user of users) {
        main.append(new UserCard(user))
    }
}
