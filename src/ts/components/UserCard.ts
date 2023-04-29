import { type User } from '../types'
import RoleBadge from './RoleBadge'

export default class UserCard extends HTMLDivElement {
    constructor(user: User) {
        super()
        this.className = 'card m-3 flex-shrink-0 shadow'
        this.innerHTML = `
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">${user.name} </h5>
            <p class="card-text">ID: ${user.userID}</p>
            <p class="card-text"><span class="fs-3">&#127874;</span> ${user.birthdate.toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</p>
        </div>`
        const roleBadge = new RoleBadge(user.role)
        this.querySelector('.card-title')
            ?.append(roleBadge)
    }
}

customElements.define('user-card', UserCard, { extends: 'div' })
