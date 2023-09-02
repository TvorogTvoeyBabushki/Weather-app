import { useEffect, useMemo, useState } from 'react'
import { AxiosResponse } from 'axios'

import WeatherService from '@/services/weather/weather.service'

import { useWeather } from '@/hooks/useWeather'

import { formatDate } from '@/utils/formatDate'

interface IWeatherFiveDayProps {
	main: {
		temp: number
	}
	dt_txt: string
	weather: { icon: string }[]
}

export const useDetailInfoWeatherFiveDay = () => {
	const [weatherFiveDay, setWeatherFiveDay] = useState<
		{ day: string; temp: number; icon: string }[] | null
	>(null)
	const [isWeatherFiveDay, setIsWeatherFiveDay] = useState(false)
	const [activeElList, setActiveElList] = useState('')

	const { localCoords, selectCity } = useWeather()
	const ulData = ['today', 'five day']

	const fetchCityWeatherFiveDay = async () => {
		const { data }: AxiosResponse<{ list: IWeatherFiveDayProps[] }> =
			await WeatherService.getCityWeatherFiveDay(
				selectCity!.city,
				selectCity!.country
			)
		convertData(data)
	}

	const handleWeatherFiveDayClick = (element: string) => {
		setActiveElList(element)

		element === 'five day'
			? setIsWeatherFiveDay(true)
			: setIsWeatherFiveDay(false)
	}

	const convertData = (data: { list: IWeatherFiveDayProps[] }) => {
		const weatherFiveDayData: { day: string; temp: number; icon: string }[] = []

		data.list.forEach(item => {
			const dateDay = formatDate(new Date(item.dt_txt), 'day')
			const timeDay = formatDate(new Date(item.dt_txt), 'time')

			timeDay === '12:00' &&
				weatherFiveDayData.push({
					day: dateDay,
					temp: Math.round(item.main.temp),
					icon: item.weather[0].icon
				})
		})

		setWeatherFiveDay(weatherFiveDayData)
	}

	const fetchWeatherFiveDay = async () => {
		const { data }: AxiosResponse<{ list: IWeatherFiveDayProps[] }> =
			await WeatherService.getWeatherFiveDay(
				localCoords.latitude,
				localCoords.longitude
			)
		convertData(data)
	}

	useEffect(() => {
		isWeatherFiveDay && selectCity && fetchCityWeatherFiveDay()
		isWeatherFiveDay && !selectCity && fetchWeatherFiveDay()

		return () => setWeatherFiveDay(null)
	}, [selectCity, isWeatherFiveDay])

	return useMemo(
		() => ({
			weatherFiveDay,
			activeElList,
			ulData,
			isWeatherFiveDay,
			handleWeatherFiveDayClick
		}),
		[weatherFiveDay, activeElList, ulData, isWeatherFiveDay]
	)
}
