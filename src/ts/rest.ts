export const fetchUsers = async (userId: number): Promise<Record<string, string>> => {
    const res = await fetch(`http://localhost:8081/api/users/${userId}`)
    return res.json()
}
