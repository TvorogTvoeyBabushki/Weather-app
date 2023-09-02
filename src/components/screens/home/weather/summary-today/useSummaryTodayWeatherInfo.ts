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

	const { cityWeatherData, isLocalGeo, setLocalCoords, setLocalWeatherData } =
		useWeather()

	useEffect(() => {
		cityWeatherData && setWeatherData(cityWeatherData)
	}, [cityWeatherData])

	const fetchWeatherInfo = async () => {
		try {
			setIsLoading(true)
			const { data: weatherToday } = await WeatherService.getWeatherToday(
				latitude,
				longitude
			)

			setWeatherData(weatherToday)
			setLocalWeatherData(weatherToday)
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
					setLocalCoords({
						latitude,
						longitude
					})
				},
				() => {
					setIsDisabledGeo(true)

					const handler = setTimeout(() => {
						setIsDisabledGeo(false)
						clearTimeout(handler)
					}, 3000)
				}
			)
		} else {
			setIsBrowserSupport(false)
		}

		return () => setIsBrowserSupport(true)
	}, [])

	useEffect(() => {
		if (latitude && longitude && isLocalGeo) {
			fetchWeatherInfo()
		}

		return () => setWeatherData(null)
	}, [latitude, longitude, isLocalGeo])

	return useMemo(
		() => ({
			weatherData,
			isLoading,
			isDisabledGeo,
			isBrowserSupport
		}),
		[weatherData, isLoading, isDisabledGeo, isBrowserSupport]
	)
}
