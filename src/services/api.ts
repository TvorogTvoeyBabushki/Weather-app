import axios from 'axios'

const API_URL = 'https://api.openweathermap.org'

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})
