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
	}
	weather: IWeather[]
	name: string
	sys: {
		country: string
	}
}
