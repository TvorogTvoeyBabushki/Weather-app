import { FunctionComponent, useEffect, useState } from 'react'
import { BsCloudRainFill, BsFillCloudFill } from 'react-icons/bs'

import { covertDegrees } from '@/utils/convertDegrees'
import { formatDateDay, formatDateTime } from '@/utils/formatDate'

import WeatherService from '@/services/weather/weather.service'

import styles from './SummaryTodayWeatherInfo.module.scss'

import { IWeatherData } from '@/shared/types/weatherData.types'

const SummaryTodayWeatherInfo: FunctionComponent = () => {
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isDisabledGeo, setIsDisabledGeo] = useState(false)

	const urlIcon = 'https://openweathermap.org/img/wn/'

	const fetchWeatherInfo = async () => {
		try {
			setIsLoading(true)
			const { data: weather } = await WeatherService.getWeatherInfo(
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

					const timerId = setTimeout(() => {
						setIsDisabledGeo(false)
						clearTimeout(timerId)
					}, 3000)
				}
			)

			if (latitude && longitude) {
				fetchWeatherInfo()
			}
		} else {
			alert('Geolocation не поддерживается вашим браузером')
		}
	}, [latitude, longitude])

	useEffect(() => {
		console.log(weatherData)
	}, [weatherData])

	return (
		<div className={styles.weather__info}>
			{isDisabledGeo && (
				<div className={styles.notification}>
					Geolocation отключена пользователем
				</div>
			)}
			{isLoading || !weatherData ? (
				<div>Loading...</div>
			) : (
				<>
					<div className={styles.icon}>
						<img
							src={`${urlIcon}${weatherData.weather[0].icon}@2x.png`}
							alt='weather icon'
						/>
					</div>

					<div className={styles.temp}>
						{covertDegrees(weatherData.main.temp)}
						<sup>°C</sup>
					</div>
					<div className={styles.date}>
						{`${formatDateDay(new Date())},`}
						<span>{formatDateTime(new Date())}</span>
					</div>
					<div className={styles.description}>
						<BsFillCloudFill />
						<p>{weatherData.weather[0].description}</p>
					</div>
					<div className={styles.clouds}>
						<BsCloudRainFill />
						<p>
							Rain - <span>{weatherData.clouds.all}</span>%
						</p>
					</div>
					<div className={styles.country}>
						<div></div>
						<p>{`${weatherData.name}, ${weatherData.sys.country}`}</p>
					</div>
				</>
			)}
		</div>
	)
}

export default SummaryTodayWeatherInfo
