import { useContext } from 'react'

import {
	IWeatherContextProps,
	WeatherContext
} from '@/provider/WeatherProvider'

export const useWeather = () =>
	useContext(WeatherContext) as IWeatherContextProps
