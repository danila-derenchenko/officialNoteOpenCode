import axios from "axios"

export const getRequest = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export const updateRequest = async (url, data) => {
    const res = await axios.put(url, data)
}