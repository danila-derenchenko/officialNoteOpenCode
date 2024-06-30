import axios from "axios"

export const getRequest = (url) => {
    return axios.get(url).then(res => res.data)
}