import { fetchUsers } from './rest'
import clearElement from './util/clear'

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
        const card = document.createElement('div')
        card.className = 'card m-3 flex-shrink-0 shadow'
        main.append(card)

        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">${user.name} 
                <span class="badge text-bg-${user.role === 'ADMIN' ? 'danger' : user.role === 'MOD' ? 'info' : 'success'}">
                    ${user.role}
                </span>
                </h5>
            <h6 class="card-subtitle mb-2 text-muted">${user.role}</h6>
            <p class="card-text">ID: ${user.userID}</p>
            <p class="card-text"><span class="fs-3">&#127874;</span> ${user.birthdate.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</p>
        </div>`
    }
}
