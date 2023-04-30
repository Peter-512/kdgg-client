import clearElement from './util/clear'
import { Toast } from 'bootstrap'
import { Channel, ResponseError } from './types'
import { fetchChannels } from './rest'
import { showToast } from './util/toast'

const removeErrorLabels = () => {
    const errorLabels = document.querySelectorAll('.is-invalid')
    errorLabels.forEach(label => {
        label.classList.remove('is-invalid')
    })
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
        const res = await fetchChannels(channelName.value, description.value)

        if (res.status === 200) {
            const data: Channel = await res.json()
            console.log(data)

            removeErrorLabels()

            channelName.value = ''
            description.value = ''
            showToast('success', 'Channel was added successfully',
                `Channel name: ${data.name} <br> Channel description: ${data.description}`)
        }

        if (res.status === 400) {
            const data: ResponseError = await res.json()

            removeErrorLabels()

            const errors: string[] = []

            for (const input of inputs) {
                data.errors.map((error) => {
                    if (error.field === input.id) {
                        input.classList.add('is-invalid')
                        errors.push(error.defaultMessage)
                    }
                })
            }

            errors.map(error => showToast('danger', 'Something went wrong...', error))
        }
    })
}
