import axios from "axios"

export const getRequest = (url: string):object => {
    return axios.get(url).then(res => res.data)
}