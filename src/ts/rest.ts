import { type Post, type User } from './types'

const baseURL = 'http://localhost:8081/api'

export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`${baseURL}/users`)
    const data = await res.json()
    return data.map((user: User) => ({
        ...user,
        birthdate: new Date(user.birthdate)
    }))
}

export const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch(`${baseURL}/posts`)
    const data = await res.json()
    return data.map((post: Post) => ({
        ...post,
        postedAt: new Date(post.postedAt)
    }))
}

export const fetchChannels = async (name: string, description: string): Promise<Response> => {
    return await fetch(`${baseURL}/channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name,
            description
        })
    })
}
