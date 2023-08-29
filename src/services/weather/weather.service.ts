import { $axios } from '../api'

const API_KEY = import.meta.env.VITE_API_KEY

class WeatherService {
	async getWeatherInfo(lat: number, lon: number) {
		return $axios.get(
			`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
		)
	}
}

export default new WeatherService()
