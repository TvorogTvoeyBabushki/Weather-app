import { FunctionComponent } from 'react'

import styles from './DetailInfoWeather.module.scss'

import DetailInfoWeatherFiveDay from './five-day/DetailInfoWeatherFiveDay'
import DetailInfoTodayWeather from './today/DetailInfoTodayWeather'

const DetailInfoWeather: FunctionComponent = () => {
	return (
		<div className={styles.weather__detail_info}>
			<DetailInfoWeatherFiveDay />
			<DetailInfoTodayWeather />
		</div>
	)
}

export default DetailInfoWeather
