import { useState, useEffect } from 'react'
import axios from 'axios'


function CommentsAPI() {
    const [comments, setComments] = useState([])
    const [callback, setCallback] = useState(false)
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getComments = async () => {
            const res = await axios.get(`/api/comment?${sort}`)
            setComments(res.data)
        }
        getComments()
    }, [callback, sort, page])

    return {
        comments: [comments, setComments],
        callback: [callback, setCallback],
        sort: [sort, setSort],
        page: [page, setPage],

    }
}

export default CommentsAPI
