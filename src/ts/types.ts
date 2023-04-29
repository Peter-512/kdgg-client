export interface User {
    userID: number,
    name: string,
    birthdate: Date,
    role: 'ADMIN' | 'MOD' | 'USER',
}

export interface Post {
    postID: number,
    content: string,
    postedAt: Date,
    userId: number,
    username: string,
    upVotes: number,
}