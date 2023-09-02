import { FunctionComponent, useEffect, useState } from 'react'

import { useWeather } from '@/hooks/useWeather'

import { formatDateUnix } from '@/utils/formatDate'
import { convertKilometers } from '@/utils/convertKilometers'

import styles from './DetailInfoTodayWeather.module.scss'

import DetailInfoTodayWeatherItem from './DetailInfoTodayWeatherItem'
import { IWeatherData } from '@/shared/types/weatherData.types'

const DetailInfoTodayWeather: FunctionComponent = () => {
	const { localWeatherData, cityWeatherData } = useWeather()
	const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)

	useEffect(() => {
		localWeatherData && setWeatherData(localWeatherData)
		cityWeatherData && setWeatherData(cityWeatherData)

		return () => setWeatherData(null)
	}, [localWeatherData, cityWeatherData])

	return (
		<div className={styles.weather__detail_info_today}>
			<h2>Today's Highlights</h2>

			{!weatherData ? (
				<div>Loading...</div>
			) : (
				<div>
					<DetailInfoTodayWeatherItem
						title='Clouds'
						description={`${weatherData.clouds.all}`}
						unit='%'
					/>
					<DetailInfoTodayWeatherItem
						title='Wind Status'
						description={`${weatherData.wind.speed}`}
						unit='m/s'
					/>
					<DetailInfoTodayWeatherItem
						title='Sunrise & Sunset'
						sunrise={formatDateUnix(
							weatherData.sys.sunrise,
							weatherData.timezone
						)}
						sunset={formatDateUnix(
							weatherData.sys.sunset,
							weatherData.timezone
						)}
					/>
					<DetailInfoTodayWeatherItem
						title='Humidity'
						description={`${weatherData.main.humidity}`}
						unit='%'
					/>
					<DetailInfoTodayWeatherItem
						title='Visibility'
						description={`${convertKilometers(weatherData.visibility)}`}
						unit='km'
					/>
					<DetailInfoTodayWeatherItem
						title='Pressure'
						description={`${weatherData.main.pressure}`}
						unit='hPa'
					/>
				</div>
			)}
		</div>
	)
}

export default DetailInfoTodayWeather
