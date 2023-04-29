import { type User } from '../types'

export default class RoleBadge extends HTMLSpanElement {
    constructor(role: User['role']) {
        super()
        this.className = `badge text-${role === 'ADMIN' ? 'danger' : role === 'MOD' ? 'info' : 'success'}`
        this.textContent = role.toLowerCase()
    }
}

customElements.define('role-badge', RoleBadge, { extends: 'span' })
