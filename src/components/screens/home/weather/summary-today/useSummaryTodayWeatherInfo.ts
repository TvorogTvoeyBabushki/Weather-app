import { useEffect, useMemo, useState } from 'react'

import WeatherService from '@/services/weather/weather.service'

import { useWeather } from '@/hooks/useWeather'
import { IWeatherData } from '@/shared/types/weatherData.types'

export const useSummaryTodayWeatherInfo = () => {
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isDisabledGeo, setIsDisabledGeo] = useState(false)
	const [isBrowserSupport, setIsBrowserSupport] = useState(true)

	const { cityWeatherData } = useWeather()
	const urlIcon = 'https://openweathermap.org/img/wn/'

	useEffect(() => {
		setWeatherData(cityWeatherData)
	}, [cityWeatherData])

	const fetchWeatherInfo = async () => {
		try {
			setIsLoading(true)
			const { data: weather } = await WeatherService.getWeatherToday(
				latitude,
				longitude
			)

			setWeatherData(weather)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords

					setLatitude(latitude)
					setLongitude(longitude)
				},
				() => {
					setIsDisabledGeo(true)

					const handler = setTimeout(() => {
						setIsDisabledGeo(false)
						clearTimeout(handler)
					}, 3000)
				}
			)

			if (latitude && longitude) {
				fetchWeatherInfo()
			}
		} else {
			setIsBrowserSupport(false)
		}

		return () => setIsBrowserSupport(true)
	}, [latitude, longitude])

	return useMemo(
		() => ({
			weatherData,
			isLoading,
			isDisabledGeo,
			urlIcon,
			isBrowserSupport
		}),
		[weatherData, isLoading, isDisabledGeo, urlIcon, isBrowserSupport]
	)
}
