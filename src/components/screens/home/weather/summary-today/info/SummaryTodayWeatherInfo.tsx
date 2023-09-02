import { FunctionComponent } from 'react'
import { BsCloudRainFill, BsFillCloudFill } from 'react-icons/bs'

import { covertDegrees } from '@/utils/convertDegrees'
import { formatDateTimezone } from '@/utils/formatDate'

import styles from './SummaryTodayWeatherInfo.module.scss'

import { IWeatherData } from '@/shared/types/weatherData.types'
import { urlIcon } from '@/constants/urlIcon'

const SummaryTodayWeatherInfo: FunctionComponent<{
	weatherData: IWeatherData | null
}> = ({ weatherData }) => {
	return (
		<div className={styles.weather__info}>
			{weatherData && (
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
						{`${formatDateTimezone(weatherData.timezone, 'day')},`}
						<span>{formatDateTimezone(weatherData.timezone, 'time')}</span>
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
