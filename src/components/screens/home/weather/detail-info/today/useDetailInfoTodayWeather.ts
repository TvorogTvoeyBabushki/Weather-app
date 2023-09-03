import { useWeather } from '@/hooks/useWeather'
import { IWeatherData } from '@/shared/types/weatherData.types'
import { useMemo, useState, useEffect } from 'react'

export const useDetailInfoTodayWeather = () => {
	const { localWeatherData, cityWeatherData } = useWeather()
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)
	const [windowWidth, setWindowWidth] = useState(
		document.documentElement.clientWidth
	)

	useEffect(() => {
		localWeatherData && setWeatherData(localWeatherData)
		cityWeatherData && setWeatherData(cityWeatherData)

		return () => setWeatherData(null)
	}, [localWeatherData, cityWeatherData])

	useEffect(() => {
		window.addEventListener('resize', () =>
			setWindowWidth(document.documentElement.clientWidth)
		)

		return () =>
			window.removeEventListener('resize', () =>
				setWindowWidth(document.documentElement.clientWidth)
			)
	}, [])

	return useMemo(
		() => ({
			weatherData,
			windowWidth
		}),
		[weatherData, windowWidth]
	)
}
