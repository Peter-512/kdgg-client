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

export type bootstrapColorVariant =
    'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'

export interface Channel {
    channelID: number,
    name: string,
    description: string,
}

export interface ResponseError {
    error: string,
    errors: {
        arguments: {
            arguments: null,
            code: string,
            codes: string[],
            defaultMessage: string,
        }[],
        bindingFailure: boolean,
        code: string,
        codes: string[],
        defaultMessage: string,
        field: string,
        objectName: string,
        rejectedValue: string,
    }[],
    message: string,
    path: string,
    status: number,
    timestamp: string,
    trace: string
}
