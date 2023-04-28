import './css/styles.css'
import { greetings } from './js/greetings.js'
import { fetchUsers } from './js/rest.js'

greetings('World')

console.log(await fetchUsers(1))
