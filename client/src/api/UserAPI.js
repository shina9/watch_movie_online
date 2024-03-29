import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentUser, setCurrentUser] = useState([])


    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCurrentUser(res.data)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()

        }
    }, [token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        currentUser: [currentUser, setCurrentUser]
    }
}


export default UserAPI

