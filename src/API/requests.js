import axios from "axios"

export const getRequest = async (url) => {
    const res = await axios.get(url)
    return res.data
}

export const updateRequest = async (url, data) => {
    const res = await axios.put(url, data)
}

export const postRequest = async (url, data) => {
    const res = await axios.post(url, data)
}

export const deleteRequest = async (url) => {
    await axios.delete(url)
}