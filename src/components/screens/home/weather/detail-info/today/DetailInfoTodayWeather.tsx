import { FunctionComponent } from 'react'

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import { formatDateUnix } from '@/utils/formatDate'
import { convertKilometers } from '@/utils/convertKilometers'

import styles from './DetailInfoTodayWeather.module.scss'

import DetailInfoTodayWeatherItem from './DetailInfoTodayWeatherItem'
import { useDetailInfoTodayWeather } from './useDetailInfoTodayWeather'

const DetailInfoTodayWeather: FunctionComponent = () => {
	const { weatherData, windowWidth } = useDetailInfoTodayWeather()

	return (
		<div className={styles.weather__detail_info_today}>
			<h2>Today's Highlights</h2>

			{!weatherData ? (
				<SkeletonLoader
					style={{ margin: '0 20px 20px 0' }}
					count={6}
					inline
					height={windowWidth < 1280 ? 170 : 150}
					width={
						windowWidth < 1280 && windowWidth > 650
							? '27%'
							: windowWidth < 650 && windowWidth > 450
							? '40%'
							: windowWidth < 450
							? '80%'
							: '30%'
					}
				/>
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
