import { FunctionComponent, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import clsx from 'clsx'

import styles from './DetailInfoWeather.module.scss'

import WeatherService from '@/services/weather/weather.service'
import { useWeather } from '@/hooks/useWeather'
import { formatDateDay, formatDateTime } from '@/utils/formatDate'
import { urlIcon } from '@/constants/urlIcon'

interface IWeatherFiveDayProps {
	main: {
		temp: number
	}
	dt_txt: string
	weather: {icon: string}[]
}

const DetailInfoWeather: FunctionComponent = () => {
	const [weatherFiveDay, setWeatherFiveDay] = useState<{day: string; temp: number; icon: string}[] | null>(null)
	const [isWeatherFiveDay, setIsWeatherFiveDay] = useState(false)
	const [activeElList, setActiveElList] = useState('')

	const { localCoords } = useWeather()
	const ulData = ['today', 'five day']

	const handleWeatherFiveDayClick = (element: string) => {
		setActiveElList(element)
		element === 'five day' ? setIsWeatherFiveDay(true) : setIsWeatherFiveDay(false)
	}

	const fetchWeatherFiveDay = async () => {
		const { data }: AxiosResponse<{list: IWeatherFiveDayProps[]}> = 
			await WeatherService.getWeatherFiveDay(localCoords.latitude, localCoords.longitude)
		const weatherFiveDayData: {day: string; temp: number; icon: string}[] = []

		data.list.forEach(item => {
			const dateDay = formatDateDay(new Date(item.dt_txt))
			const timeDay = formatDateTime(new Date(item.dt_txt))

			timeDay === '12:00' && weatherFiveDayData.push({
				day: dateDay,
				temp: Math.round(item.main.temp),
				icon: item.weather[0].icon
			})
		},)
		
		setWeatherFiveDay(weatherFiveDayData)
	}

	useEffect(() => {
		isWeatherFiveDay && fetchWeatherFiveDay()
	},[isWeatherFiveDay])

	useEffect(() => console.log(weatherFiveDay),[weatherFiveDay])

	return (
	<div>
		<div className={styles.weather__detail_info}>
			<nav>
				<ul>
					{ulData.map((element, index) => (
						<li key={index}>
							<button
								className={clsx('', {
									[styles.active]: activeElList === element || (!isWeatherFiveDay && element === 'today')
								})}
								disabled={activeElList === element ? true : false}
							  onClick={() => handleWeatherFiveDayClick(element)}>
									{element}
							</button>
						</li>
					))}
				</ul>
			</nav>

			{isWeatherFiveDay && <div>
				{weatherFiveDay?.map((item, index) => (
					<div key={index}>
						<p>{item.day}</p>
						<img src={`${urlIcon}${item.icon}@2x.png`} alt="" />
						<p>{item.temp}°C</p>
					</div>
				))}
			</div>}
		</div>
	</div>
)}

export default DetailInfoWeather
