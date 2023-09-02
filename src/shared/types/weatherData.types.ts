interface IWeather {
	description: string
	icon: string
	id: number
	main: string
}

export interface IWeatherData {
	clouds: {
		all: number
	}
	main: {
		temp: number
		pressure: number
		humidity: number
	}
	weather: IWeather[]
	name: string
	sys: {
		country: string
		sunrise: number
		sunset: number
	}
	timezone: number
	visibility: number
	wind: {
		speed: number
	}
}
