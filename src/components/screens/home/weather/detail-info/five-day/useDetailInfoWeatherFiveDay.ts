import { useEffect, useMemo, useState } from 'react'
import { AxiosResponse } from 'axios'

import WeatherService from '@/services/weather/weather.service'

import { useWeather } from '@/hooks/useWeather'

import { formatDate, formatDateUnix } from '@/utils/formatDate'

interface IWeatherFiveDayProps {
	main: {
		temp: number
	}
	dt_txt: string
	dt: number
	weather: { icon: string }[]
}

export const useDetailInfoWeatherFiveDay = () => {
	const [isWeatherFiveDay, setIsWeatherFiveDay] = useState(false)
	const [activeElList, setActiveElList] = useState('')
	const [windowWidth, setWindowWidth] = useState(
		document.documentElement.clientWidth
	)

	const { localCoords, selectCity, setWeatherFiveDay, weatherFiveDay } =
		useWeather()
	const ulData = ['today', 'five day']

	const fetchCityWeatherFiveDay = async () => {
		try {
			const {
				data
			}: AxiosResponse<{
				city: { timezone: number }
				list: IWeatherFiveDayProps[]
			}> = await WeatherService.getCityWeatherFiveDay(
				selectCity!.city,
				selectCity!.country
			)
			convertData(data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleWeatherFiveDayClick = (element: string) => {
		setActiveElList(element)

		element === 'five day'
			? setIsWeatherFiveDay(true)
			: setIsWeatherFiveDay(false)
	}

	const convertData = (data: {
		city: { timezone: number }
		list: IWeatherFiveDayProps[]
	}) => {
		const weatherFiveDayData: { day: string; temp: number; icon: string }[] = []

		data.list.forEach(item => {
			const timeDay = formatDateUnix(item.dt, data.city.timezone)

			if (timeDay >= '11:00' && timeDay <= '13:00') {
				const dateDay = formatDate(new Date(item.dt_txt), 'day')

				weatherFiveDayData.push({
					day: dateDay,
					temp: Math.round(item.main.temp),
					icon: item.weather[0].icon
				})
			}
		})

		setWeatherFiveDay(weatherFiveDayData)
	}

	const fetchWeatherFiveDay = async () => {
		try {
			const {
				data
			}: AxiosResponse<{
				city: { timezone: number }
				list: IWeatherFiveDayProps[]
			}> = await WeatherService.getWeatherFiveDay(
				localCoords!.latitude,
				localCoords!.longitude
			)
			convertData(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		isWeatherFiveDay &&
			selectCity &&
			!weatherFiveDay &&
			fetchCityWeatherFiveDay()
		isWeatherFiveDay &&
			!selectCity &&
			!weatherFiveDay &&
			localCoords &&
			fetchWeatherFiveDay()
	}, [selectCity, isWeatherFiveDay, localCoords])

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
			weatherFiveDay,
			activeElList,
			ulData,
			isWeatherFiveDay,
			windowWidth,
			handleWeatherFiveDayClick
		}),
		[weatherFiveDay, activeElList, ulData, isWeatherFiveDay, windowWidth]
	)
}
