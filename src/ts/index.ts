import '../scss/styles.scss'
import 'bootstrap'
import { greetings } from './greetings'
import { fetchUsers } from './rest'

greetings('World')

console.log(await fetchUsers(1))
