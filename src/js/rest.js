export const fetchUsers = async (userId) => {
    const res = await fetch(`http://localhost:8081/api/users/${userId}`)

    return res.json()
}
