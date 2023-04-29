import clearElement from './util/clear'
import { Toast } from 'bootstrap'
import { type bootstrapColorVariant } from './types'

export function createToast(type: bootstrapColorVariant, header: string, body: string) {
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

export async function showAdd() {
    const main = document.querySelector('main')
    if (!main) throw new Error('No main element found')

    clearElement(main)

    main.innerHTML = `
        <div class="mx-auto w-50">
            <form id="add-channel-form" class="my-5 d-flex flex-column align-items-stretch gap-3">
				        <div class="input-group has-validation">
                    <div id="name" class="form-floating text-success">
                        <input class="form-control form-control-lg bg-black text-light border-0"
                         placeholder="blank" id="name-input" type="text" />
                        <label id="name-label" for="name-input" class="form-label">Channel name</label>
                    </div>
                    <div class="invalid-feedback bg-warning p-1 rounded">
                        Please enter a channel name
                    </div>
                </div>
                    <div class="input-group has-validation">
                        <div id="description" class="form-floating text-success">
                            <textarea id="description-input" class="form-control form-control-lg bg-black text-light border-0" placeholder="blank" style="height: 150px" ></textarea>
                            <label id="description-label" for="description-input" class="form-label">Description:</label>
                        </div>
                    <div class="invalid-feedback bg-warning p-1 rounded">
                        Please enter a channel description
                    </div>
                    </div>
                <button class="btn btn-success" id="add-channel">Add channel</button>
            </form>
        </div>`

    const channelName: HTMLInputElement | null = document.querySelector('#name-input')
    const description: HTMLInputElement | null = document.querySelector('#description-input')
    const submit: HTMLButtonElement | null = document.querySelector('#add-channel')
    const form: HTMLFormElement | null = document.querySelector('#add-channel-form')

    if (!channelName || !description || !submit || !form) throw new Error('Oops something went wrong')

    const inputs = form.querySelectorAll('.form-floating')

    submit.addEventListener('click', async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8081/api/channels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: channelName.value,
                description: description.value
            })
        })

        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            channelName.value = ''
            description.value = ''
            const {
                toastContainer,
                toastElement
            } = createToast('success', 'Yaaayyyyy', 'Channel was added successfully')

            if (!toastContainer) throw new Error('No toast container found')
            toastContainer.appendChild(toastElement)
            const toast = new Toast(toastElement)
            toast.isShown() || toast.show()
        }

        if (res.status === 400) {
            const data = await res.json()
            console.log(data)
            for (const input of inputs) {
                data.errors.map((error: any) => {
                    if (error.field === input.id) {
                        input.classList.add('is-invalid')
                    }
                })
            }
            const {
                toastContainer,
                toastElement
            } = createToast('danger', 'Something went wrong...', 'Please try again')

            if (!toastContainer) throw new Error('No toast container found')
            toastContainer.appendChild(toastElement)
            const toast = new Toast(toastElement)
            toast.isShown() || toast.show()
        }
    })
}
