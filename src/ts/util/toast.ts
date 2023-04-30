import { type bootstrapColorVariant } from '../types'
import { Toast } from 'bootstrap'

function createToast(type: bootstrapColorVariant, header: string, body: string) {
    const toastContainer = document.querySelector('.toast-container')
    const toastElement = document.createElement('div')
    toastElement.classList.add('toast', 'fade', 'bg-dark', 'text-light')
    toastElement.setAttribute('role', 'alert')
    toastElement.setAttribute('aria-live', 'assertive')
    toastElement.setAttribute('aria-atomic', 'true')
    toastElement.innerHTML = `
                <div class="toast-header bg-secondary text-${type}">
                    <i class="bi bi-bell-fill me-2"></i>
                    <strong class="me-auto">${header}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${body}
           			</div>`
    return {
        toastContainer,
        toastElement
    }
}

export function showToast(type: bootstrapColorVariant, header: string, body: string) {
    const {
        toastContainer,
        toastElement
    } = createToast(type, header, body)

    if (!toastContainer) throw new Error('No toast container found')

    toastContainer.appendChild(toastElement)
    const toast = new Toast(toastElement)
    toast.show()
}
