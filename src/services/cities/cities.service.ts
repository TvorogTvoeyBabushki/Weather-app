import axios from 'axios'

class CitiesService {
	async getAllCities() {
		return axios.get('https://countriesnow.space/api/v0.1/countries', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}

export default new CitiesService()
