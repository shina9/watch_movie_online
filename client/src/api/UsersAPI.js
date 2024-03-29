import { useState, useEffect } from 'react'
import axios from 'axios'

function UsersAPI() {
    const [users, setUsers] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get('/api/users')
            setUsers(res.data)
        }
        getUsers()
    }, [callback])
    return {
        users: [users, setUsers],
        callback: [callback, setCallback]
    }
}

export default UsersAPI
