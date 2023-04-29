import { Post, User } from './types'

export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch('http://localhost:8081/api/users')
    const data = await res.json()
    return data.map((user: User) => ({
        ...user,
        birthdate: new Date(user.birthdate)
    }))
}

export const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch('http://localhost:8081/api/posts')
    const data = await res.json()
    return data.map((post: Post) => ({
        ...post,
        postedAt: new Date(post.postedAt)
    }))
}
