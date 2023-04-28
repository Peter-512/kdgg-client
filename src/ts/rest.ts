interface User {
    userID: number,
    name: string,
    birthdate: Date,
    role: string,
}

interface Post {
    postID: number,
    content: string,
    postedAt: Date,
    userId: number,
    username: string,
    upVotes: number,
}

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
