import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

class WeatherService {
	async getWeatherToday(lat: number, lon: number) {
		return axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}

	async getCityWeather(city: string, country: string) {
		return axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${city},${country.toLowerCase()}&appid=${API_KEY}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}

	async getWeatherFiveDay(lat: number, lon: number) {
		return  axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}

	async getCityWeatherFiveDay(city: string, country: string) {
		return axios.get(
			`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country.toLowerCase()}&appid=${API_KEY}&units=metric`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}
}

export default new WeatherService()
