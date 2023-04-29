import { fetchUsers } from './rest'
import clearElement from './util/clear'
import UserCard from './components/UserCard'
import LoadingIndicator from './components/LoadingIndicator'

export async function showUsers() {
    const main = document.querySelector('main')
    if (!main) throw new Error('No main element found')

    clearElement(main)

    main.append(new LoadingIndicator())

    const users = await fetchUsers()
    clearElement(main)

    users.map(user => {
        main.append(new UserCard(user))
    })
}
