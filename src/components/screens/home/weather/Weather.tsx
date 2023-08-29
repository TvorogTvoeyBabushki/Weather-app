import { FunctionComponent } from 'react'

import styles from './Weather.module.scss'

import DetailInfoWeather from './detail-info/DetailInfoWeather'
import SummaryTodayWeather from './summary-today/SummaryTodayWeather'

const Weather: FunctionComponent = () => {
	return (
		<div className={styles.weather__wrapper}>
			<SummaryTodayWeather />
			<DetailInfoWeather />
		</div>
	)
}

export default Weather
