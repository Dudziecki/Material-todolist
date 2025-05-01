import axios from 'axios'

const token = '52a8871e-b50e-407c-b7bf-b804846a54d9'
const apiKey = '5fad9655-7393-4794-9838-c3907ba2a60b'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
})